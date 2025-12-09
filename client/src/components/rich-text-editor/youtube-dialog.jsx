import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Star } from "lucide-react";
import { Link2 } from "lucide-react";

// Component input dialog đẹp với Sonner
function YoutubeInputDialog({ onSubmit, onCancel }) {
  const [url, setUrl] = useState("");

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex items-center h-10 w-full rounded-full border shadow-lg">
        <span className="px-3 shrink-0">
          <Link2 size={16} />
        </span>

        {/* Thẻ Input chính */}
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://youtube.com/"
          className="flex-1 bg-transparent text-sm focus-visible:outline-none"
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter" && url.trim()) {
              onSubmit(url.trim());
            } else if (e.key === "Escape") {
              onCancel();
            }
          }}
        />

        <span className="px-3 shrink-0 cursor-pointer">
          <Star size={16} />
        </span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onCancel}
          className="inline-flex items-center justify-center rounded-2xl text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 flex-1"
        >
          Hủy
        </button>
        <button
          onClick={() => url.trim() && onSubmit(url.trim())}
          disabled={!url.trim()}
          className="inline-flex items-center justify-center rounded-2xl text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 flex-1"
        >
          Thêm
        </button>
      </div>
    </div>
  );
}
// Function để sử dụng trong MenuBar
export function addYoutubeWithSonner(editor) {
  let toastId;

  const handleSubmit = (url) => {
    try {
      editor.commands.setYoutubeVideo({
        src: url,
        width: 640,
        height: 360,
      });
      toast.dismiss(toastId);
      toast.success("Đã thêm video YouTube!");
    } catch (error) {
      toast.error("Không thể thêm video. Vui lòng kiểm tra link!");
    }
  };

  const handleCancel = () => {
    toast.dismiss(toastId);
  };

  toastId = toast(
    <YoutubeInputDialog onSubmit={handleSubmit} onCancel={handleCancel} />,
    {
      duration: Infinity,
      closeButton: false,
      position: "top-center",
    }
  );
}

export default YoutubeInputDialog;
