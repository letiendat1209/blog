"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Cropper from "react-easy-crop";
import { ImageIcon, X } from "lucide-react";
import { createCroppedImage } from "@/lib/utils";

export default function CoverImageUpload({ preview, onImageChange, onRemove }) {
  const [isCropping, setIsCropping] = useState(false);
  const [imageToCrop, setImageToCrop] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const fileInputRef = useRef(null);

  const openFile = () => fileInputRef.current?.click();

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const loadImage = (file) => {
    if (!file.type.startsWith("image/")) return alert("Chỉ chọn ảnh thôi nha!");
    if (file.size > 5 * 1024 * 1024) return alert("Tối đa 5MB!");

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageToCrop(reader.result);
      setIsCropping(true);
    };
    reader.readAsDataURL(file);
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

  const getCroppedImage = async () => {
    const img = await createCroppedImage(imageToCrop, croppedAreaPixels);
    onImageChange(null, img);
    setIsCropping(false);
  };

  return (
    <>
      {/* MAIN UPLOAD ZONE */}
      <div
        className="relative w-full h-72 rounded-lg border bg-muted/30 overflow-hidden group transition"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {preview ? (
          <>
            <Image
              src={preview}
              alt="Cover"
              fill
              className="object-cover rounded-lg transition-all group-hover:scale-[1.015]"
            />

            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors z-10" />

            {/* Remove */}
            <button
              onClick={onRemove}
              className="absolute top-3 right-3 z-20 p-2 rounded-full bg-red-600 text-white shadow hover:bg-red-700"
            >
              <X size={16} />
            </button>

            {/* Change */}
            <button
              onClick={openFile}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20
              px-5 py-2 bg-background/90 backdrop-blur rounded-full text-sm font-medium
              shadow hover:bg-accent transition"
            >
              Change Image
            </button>
          </>
        ) : (
          <div
            onClick={openFile}
            className="w-full h-full flex flex-col items-center justify-center gap-2 cursor-pointer
            border-2 border-dashed border-muted-foreground/40 hover:border-primary/60
            hover:bg-accent/20 transition-all"
          >
            <ImageIcon size={40} className="text-muted-foreground" />
            <p className="text-sm font-medium text-muted-foreground">
              Upload cover image
            </p>
            <p className="text-xs text-muted-foreground/50">
              JPEG, PNG • Max 5MB
            </p>
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* === CROP MODAL === */}
      {isCropping && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-100 flex items-center justify-center">
          <div className="bg-background rounded-xl p-6 w-[90%] max-w-lg shadow-xl relative">
            <h2 className="text-lg font-semibold mb-4">Crop Image</h2>

            <div className="relative w-full h-72 bg-black/40 rounded-lg overflow-hidden">
              <Cropper
                image={imageToCrop}
                crop={crop}
                zoom={zoom}
                aspect={16 / 9}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-5">
              <button
                className="px-4 py-2 text-sm rounded-md bg-muted hover:bg-muted/70"
                onClick={() => setIsCropping(false)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 text-sm rounded-md bg-primary text-white hover:bg-primary/80"
                onClick={getCroppedImage}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

