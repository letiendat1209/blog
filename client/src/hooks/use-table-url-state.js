import { useMemo, useState, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

/**
 * Hook để quản lý trạng thái table thông qua URL search parameters cho Next.js
 *
 * @param {Object} params - Cấu hình hook
 * @param {Object} [params.pagination] - Cấu hình phân trang
 * @param {string} [params.pagination.pageKey='page'] - Key trong URL cho số trang
 * @param {string} [params.pagination.pageSizeKey='pageSize'] - Key trong URL cho kích thước trang
 * @param {number} [params.pagination.defaultPage=1] - Trang mặc định
 * @param {number} [params.pagination.defaultPageSize=10] - Số item/trang mặc định
 * @param {Object} [params.globalFilter] - Cấu hình tìm kiếm toàn cục
 * @param {boolean} [params.globalFilter.enabled=true] - Bật/tắt tính năng
 * @param {string} [params.globalFilter.key='filter'] - Key trong URL
 * @param {boolean} [params.globalFilter.trim=true] - Tự động loại bỏ khoảng trắng
 * @param {Array} [params.columnFilters=[]] - Cấu hình lọc theo cột
 *
 * @returns {Object} Trạng thái và handlers cho table
 */
export function useTableUrlState(params = {}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const {
    pagination: paginationCfg,
    globalFilter: globalFilterCfg,
    columnFilters: columnFiltersCfg = [],
  } = params;

  const pageKey = paginationCfg?.pageKey ?? "page";
  const pageSizeKey = paginationCfg?.pageSizeKey ?? "pageSize";
  const defaultPage = paginationCfg?.defaultPage ?? 1;
  const defaultPageSize = paginationCfg?.defaultPageSize ?? 10;

  const globalFilterKey = globalFilterCfg?.key ?? "filter";
  const globalFilterEnabled = globalFilterCfg?.enabled ?? true;
  const trimGlobal = globalFilterCfg?.trim ?? true;

  // Helper để update URL params
  const updateSearchParams = useCallback(
    (updates, options = {}) => {
      const current = new URLSearchParams(searchParams.toString());

      // Apply updates
      Object.entries(updates).forEach(([key, value]) => {
        if (value === undefined || value === null || value === "") {
          current.delete(key);
        } else {
          current.set(key, String(value));
        }
      });

      const search = current.toString();
      const query = search ? `?${search}` : "";

      if (options.replace) {
        router.replace(`${pathname}${query}`, { scroll: false });
      } else {
        router.push(`${pathname}${query}`, { scroll: false });
      }
    },
    [searchParams, pathname, router]
  );

  // Build initial column filters from the current search params
  const initialColumnFilters = useMemo(() => {
    const collected = [];

    for (const cfg of columnFiltersCfg) {
      const raw = searchParams.get(cfg.searchKey);
      const deserialize = cfg.deserialize ?? ((v) => v);

      if (cfg.type === "string") {
        const value = deserialize(raw) ?? "";
        if (typeof value === "string" && value.trim() !== "") {
          collected.push({ id: cfg.columnId, value });
        }
      } else {
        // default to array type
        const value = deserialize(raw) ?? [];
        if (Array.isArray(value) && value.length > 0) {
          collected.push({ id: cfg.columnId, value });
        }
      }
    }

    return collected;
  }, [columnFiltersCfg, searchParams]);

  const [columnFilters, setColumnFilters] = useState(initialColumnFilters);

  const pagination = useMemo(() => {
    const rawPage = searchParams.get(pageKey);
    const rawPageSize = searchParams.get(pageSizeKey);

    const pageNum = rawPage ? parseInt(rawPage, 10) : defaultPage;
    const pageSizeNum = rawPageSize
      ? parseInt(rawPageSize, 10)
      : defaultPageSize;

    return {
      pageIndex: Math.max(0, pageNum - 1),
      pageSize: pageSizeNum,
    };
  }, [searchParams, pageKey, pageSizeKey, defaultPage, defaultPageSize]);

  const onPaginationChange = useCallback(
    (updater) => {
      const next =
        typeof updater === "function" ? updater(pagination) : updater;
      const nextPage = next.pageIndex + 1;
      const nextPageSize = next.pageSize;

      updateSearchParams({
        [pageKey]: nextPage <= defaultPage ? undefined : nextPage,
        [pageSizeKey]:
          nextPageSize === defaultPageSize ? undefined : nextPageSize,
      });
    },
    [
      pagination,
      pageKey,
      pageSizeKey,
      defaultPage,
      defaultPageSize,
      updateSearchParams,
    ]
  );

  const [globalFilter, setGlobalFilter] = useState(() => {
    if (!globalFilterEnabled) return undefined;
    return searchParams.get(globalFilterKey) || "";
  });

  const onGlobalFilterChange = useCallback(
    (updater) => {
      if (!globalFilterEnabled) return;

      const next =
        typeof updater === "function" ? updater(globalFilter ?? "") : updater;
      const value = trimGlobal ? next.trim() : next;

      setGlobalFilter(value);

      updateSearchParams({
        [pageKey]: undefined,
        [globalFilterKey]: value || undefined,
      });
    },
    [
      globalFilterEnabled,
      globalFilter,
      trimGlobal,
      pageKey,
      globalFilterKey,
      updateSearchParams,
    ]
  );

  const onColumnFiltersChange = useCallback(
    (updater) => {
      const next =
        typeof updater === "function" ? updater(columnFilters) : updater;
      setColumnFilters(next);

      const updates = { [pageKey]: undefined };

      for (const cfg of columnFiltersCfg) {
        const found = next.find((f) => f.id === cfg.columnId);
        const serialize = cfg.serialize ?? ((v) => v);

        if (cfg.type === "string") {
          const value = typeof found?.value === "string" ? found.value : "";
          updates[cfg.searchKey] =
            value.trim() !== "" ? serialize(value) : undefined;
        } else {
          const value = Array.isArray(found?.value) ? found.value : [];
          updates[cfg.searchKey] =
            value.length > 0 ? serialize(value) : undefined;
        }
      }

      updateSearchParams(updates);
    },
    [columnFilters, columnFiltersCfg, pageKey, updateSearchParams]
  );

  const ensurePageInRange = useCallback(
    (pageCount, opts = { resetTo: "first" }) => {
      const currentPage = searchParams.get(pageKey);
      const pageNum = currentPage ? parseInt(currentPage, 10) : defaultPage;

      if (pageCount > 0 && pageNum > pageCount) {
        updateSearchParams(
          {
            [pageKey]: opts.resetTo === "last" ? pageCount : undefined,
          },
          { replace: true }
        );
      }
    },
    [searchParams, pageKey, defaultPage, updateSearchParams]
  );

  return {
    globalFilter: globalFilterEnabled ? globalFilter ?? "" : undefined,
    onGlobalFilterChange: globalFilterEnabled
      ? onGlobalFilterChange
      : undefined,
    columnFilters,
    onColumnFiltersChange,
    pagination,
    onPaginationChange,
    ensurePageInRange,
  };
}
