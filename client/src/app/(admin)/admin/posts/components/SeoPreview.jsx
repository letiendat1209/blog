export default function SeoPreview({
  title,
  description,
  slug,
  siteName = "yourdomain.com",
}) {
  const finalTitle = title || "Tiêu đề SEO sẽ hiển thị ở đây";
  const finalDesc =
    description || "Mô tả SEO sẽ hiển thị ở đây. Khoảng 150–160 ký tự là đẹp.";
  const url = `${siteName}/${slug || "slug-bai-viet"}`;

  return (
    <div className="border rounded-lg p-4 bg-muted/40">
      <p className="text-xs text-muted-foreground mb-1">Google preview</p>

      <div className="flex flex-col gap-1">
        <span className="text-blue-600 text-lg leading-snug line-clamp-2">
          {finalTitle}
        </span>

        <span className="text-green-700 text-sm truncate">{url}</span>

        <p className="text-sm text-muted-foreground line-clamp-3">
          {finalDesc}
        </p>
      </div>
    </div>
  );
}
