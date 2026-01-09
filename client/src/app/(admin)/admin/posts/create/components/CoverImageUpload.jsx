"use client";
import { useRef } from "react";
import Image from "next/image";
import { ImageIcon, X } from "lucide-react";

export default function CoverImageUpload({ preview, onImageChange, onRemove }) {
  const fileInputRef = useRef(null);

  const openFile = () => fileInputRef.current?.click();

  const loadImage = (file) => {
    if (!file.type.startsWith("image/")) {
      alert("Chỉ chọn ảnh thôi nha!");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Tối đa 5MB!");
      return;
    }

    // 👉 chỉ tạo preview URL, KHÔNG base64
    const previewUrl = URL.createObjectURL(file);

    // 👉 gửi FILE + preview URL
    onImageChange(file, previewUrl);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) loadImage(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) loadImage(file);
  };

  return (
    <div
      onClick={openFile}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="relative w-full h-48 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors cursor-pointer overflow-hidden"
    >
      {preview ? (
        <>
          <Image
            src={preview}
            alt="Cover preview"
            fill
            className="object-cover"
          />

          {/* Remove */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full z-10"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="absolute bottom-2 right-2 px-3 py-1.5 bg-black/50 text-white text-sm rounded-md">
            Change Image
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full gap-2 text-gray-500">
          <ImageIcon className="w-12 h-12" />
          <p className="text-sm font-medium">Upload cover image</p>
          <p className="text-xs text-gray-400">JPEG, PNG • Max 5MB</p>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
