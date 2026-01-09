"use client";

import { Upload, X, Loader2 } from "lucide-react";

export default function CoverImageUpload({
  preview,
  onImageChange,
  onRemove,
  isUploading = false,
}) {
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    onImageChange(file, previewUrl);
  };

  return (
    <div className="w-full">
      {!preview ? (
        <label className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl cursor-pointer hover:bg-muted/50 transition">
          <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Upload cover image
          </span>

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            disabled={isUploading}
          />

          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/70 rounded-xl">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          )}
        </label>
      ) : (
        <div className="relative w-full h-64 rounded-xl overflow-hidden">
          <img
            src={preview}
            alt="Cover preview"
            className="w-full h-full object-cover"
          />

          {/* overlay loading */}
          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <Loader2 className="w-6 h-6 text-white animate-spin" />
            </div>
          )}

          {!isUploading && (
            <button
              type="button"
              onClick={onRemove}
              className="absolute top-3 right-3 bg-black/60 hover:bg-black text-white rounded-full p-2 transition"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
