import { useState } from "react";
import { ChevronDown } from "lucide-react";
import SeoPreview from "../../components/SeoPreview";
import { cn } from "@/utils/utils";

export default function BlogMetaForm({
  meta,
  onChange,
  disabled,
  disableSlug,
}) {
  const [openSeo, setOpenSeo] = useState(false);

  const update = (key, value) => {
    onChange({
      ...meta,
      [key]: value,
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-5">
      {/* Title */}
      <input
        type="text"
        placeholder="Tiêu đề bài viết"
        value={meta.title}
        onChange={(e) => update("title", e.target.value)}
        className="text-4xl font-bold outline-none text-center bg-transparent"
      />

      {/* Slug */}
      <input
        type="text"
        disabled={disableSlug || disabled}
        placeholder="slug-bai-viet"
        value={meta.slug}
        onChange={(e) => update("slug", e.target.value)}
        className={cn(
          "input",
          disableSlug &&
            "cursor-not-allowed opacity-60 text-sm text-muted-foreground text-center outline-none bg-transparent"
        )}
      />

      {/* Short description */}
      <textarea
        placeholder="Mô tả ngắn"
        value={meta.shortDescription}
        onChange={(e) => update("shortDescription", e.target.value)}
        rows={2}
        className="resize-none text-sm"
      />

      {/* SEO DROPDOWN */}
      <div className="border rounded-lg overflow-hidden">
        <button
          type="button"
          onClick={() => setOpenSeo(!openSeo)}
          className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium hover:bg-muted/50"
        >
          <span>SEO (Google)</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              openSeo ? "rotate-180" : ""
            }`}
          />
        </button>

        {openSeo && (
          <div className="px-4 py-4 flex flex-col gap-3 border-t">
            <input
              type="text"
              placeholder="SEO title"
              value={meta.seoTitle}
              onChange={(e) => update("seoTitle", e.target.value)}
            />

            <textarea
              placeholder="SEO description (150–160 ký tự)"
              value={meta.seoDescription}
              onChange={(e) => update("seoDescription", e.target.value)}
              rows={3}
            />

            <p className="text-xs text-muted-foreground">
              {meta.seoDescription?.length || 0}/160 ký tự
            </p>

            <SeoPreview
              title={meta.seoTitle || meta.title}
              description={meta.seoDescription || meta.shortDescription}
              slug={meta.slug}
            />
          </div>
        )}
      </div>
    </div>
  );
}
