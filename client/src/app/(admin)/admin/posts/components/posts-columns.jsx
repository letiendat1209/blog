import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { labels, statuses } from "../data/data";
import RowActions from "./row-action";
import { DataTableColumnHeader } from "@/components/shared/data-table";
import { LongText } from "@/components/ui/long-text";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { Eye, Clock, Star } from "lucide-react";

export const postsColumns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-0.5"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-0.5"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "coverImage",
    header: "Ảnh bìa",
    cell: ({ row }) => (
      <div className="flex items-center">
        <img
          src={row.getValue("coverImage")}
          alt="Cover"
          className="h-10 w-16 rounded object-cover"
          loading="lazy"
        />
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tiêu đề" />
    ),
    meta: { className: "ps-1", tdClassName: "ps-4" },
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label);
      const isFeatured = row.original.isFeatured;

      return (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            {isFeatured && (
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            )}
            <LongText className="max-w-60 font-medium">
              {row.getValue("title")}
            </LongText>
          </div>
          {label && (
            <Badge variant="outline" className="w-fit text-xs">
              {label.label}
            </Badge>
          )}
        </div>
      );
    },
  },
  // {
  //   accessorKey: "slug",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Slug" />
  //   ),
  //   cell: ({ row }) => (
  //     <div className="max-w-32">
  //       <LongText className="font-mono text-xs text-muted-foreground">
  //         {row.getValue("slug")}
  //       </LongText>
  //     </div>
  //   ),
  // },
  // {
  //   accessorKey: "shortDescription",
  //   header: "Mô tả",
  //   cell: ({ row }) => (
  //     <div className="max-w-64">
  //       <LongText className="text-sm text-muted-foreground">
  //         {row.getValue("shortDescription") || "Chưa có mô tả"}
  //       </LongText>
  //     </div>
  //   ),
  //   enableSorting: false,
  // },
  {
    accessorKey: "author",
    header: "Tác giả",
    cell: ({ row }) => {
      const author = row.getValue("author");
      if (!author) return null;

      return (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={author.avatarUrl} alt={author.name} />
            <AvatarFallback>
              {author.name
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{author.name}</span>
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Trạng thái" />
    ),
    meta: {
      className: "ps-1",
      tdClassName: "ps-4",
    },
    cell: ({ row }) => {
      const statusValue = row.getValue("status");
      const status = statuses.find((status) => status.value === statusValue);

      if (!status) return null;

      return (
        <div className="flex items-center gap-2">
          {status.icon && (
            <status.icon className="h-4 w-4 text-muted-foreground" />
          )}
          <span className="text-sm">{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "views",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lượt xem" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5 text-sm">
        <Eye className="h-4 w-4 text-muted-foreground" />
        <span>{row.getValue("views").toLocaleString()}</span>
      </div>
    ),
    enableSorting: true,
  },
  // {
  //   accessorKey: "readTime",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Thời gian đọc" />
  //   ),
  //   cell: ({ row }) => (
  //     <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
  //       <Clock className="h-4 w-4" />
  //       <span>{row.getValue("readTime")} phút</span>
  //     </div>
  //   ),
  //   enableSorting: true,
  // },
  {
    accessorKey: "publishedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ngày xuất bản" />
    ),
    cell: ({ row }) => {
      const publishedAt = row.getValue("publishedAt");
      const scheduledAt = row.original.scheduledAt;

      if (publishedAt) {
        return (
          <div className="text-sm">
            <div className="font-medium">
              {formatDistanceToNow(new Date(publishedAt), {
                addSuffix: true,
                locale: vi,
              })}
            </div>
            <div className="text-xs text-muted-foreground">
              {new Date(publishedAt).toLocaleDateString("vi-VN")}
            </div>
          </div>
        );
      }

      if (scheduledAt) {
        return (
          <div className="text-sm text-orange-600">
            <div className="font-medium">Đã lên lịch</div>
            <div className="text-xs">
              {new Date(scheduledAt).toLocaleDateString("vi-VN")}
            </div>
          </div>
        );
      }

      return (
        <span className="text-sm text-muted-foreground">Chưa xuất bản</span>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ngày tạo" />
    ),
    cell: ({ row }) => (
      <div className="text-sm text-muted-foreground">
        {formatDistanceToNow(new Date(row.getValue("createdAt")), {
          addSuffix: true,
          locale: vi,
        })}
      </div>
    ),
    enableSorting: true,
  },
  {
    id: "actions",
    cell: ({ row }) => <RowActions row={row} />,
  },
];
