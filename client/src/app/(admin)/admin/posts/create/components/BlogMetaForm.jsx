export default function BlogMetaForm({ meta, onChange }) {
  const handleChange = (field, value) => {
    onChange({ ...meta, [field]: value });
  };

  return (
    <div className="flex flex-col items-center text-center gap-3">
      <p className="text-xs tracking-wide text-gray-400">
        {meta.date || "DECEMBER 9, 2025"}
      </p>

      <input
        value={meta.title}
        onChange={(e) => handleChange("title", e.target.value)}
        placeholder="Blog Title"
        className="bg-transparent text-4xl p-2 font-semibold text-center outline-none placeholder:text-gray-500 w-full"
      />

      <input
        value={meta.slug}
        onChange={(e) => handleChange("slug", e.target.value)}
        placeholder="url-slug"
        className="bg-transparent text-sm text-gray-400 text-center outline-none placeholder:text-gray-600 w-full"
      />

      <input
        value={meta.tags}
        onChange={(e) => handleChange("tags", e.target.value)}
        placeholder="Tags (comma separated)"
        className="bg-transparent text-sm text-gray-400 text-center outline-none placeholder:text-gray-600 w-full"
      />
    </div>
  );
}
