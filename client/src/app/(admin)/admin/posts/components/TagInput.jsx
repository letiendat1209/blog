import { useState } from "react";

export default function TagInput({ value = [], onChange, disabled }) {
  const [input, setInput] = useState("");

  const addTag = () => {
    const tag = input.trim().toLowerCase();
    if (!tag) return;
    if (value.includes(tag)) {
      setInput("");
      return;
    }

    onChange([...value, tag]);
    setInput("");
  };

  const removeTag = (tag) => {
    onChange(value.filter((t) => t !== tag));
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">Tags</label>

      <div className="flex flex-wrap items-center gap-2 p-2 border rounded-md focus-within:ring-2 focus-within:ring-primary">
        {value.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1 px-2 py-1 text-sm rounded bg-muted"
          >
            #{tag}
            {!disabled && (
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="text-muted-foreground hover:text-destructive"
              >
                ×
              </button>
            )}
          </span>
        ))}

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTag();
            }
          }}
          disabled={disabled}
          placeholder="Nhập tag rồi Enter"
          className="flex-1 min-w-[120px] bg-transparent outline-none text-sm"
        />
      </div>

      <p className="text-xs text-muted-foreground">Nhấn Enter để thêm tag</p>
    </div>
  );
}
