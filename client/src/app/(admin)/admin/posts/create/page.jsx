"use client";

import RichTextEditor from "@/components/rich-text-editor/Tiptap";
import { useState } from "react";
import CoverImageUpload from "./components/CoverImageUpload";
import BlogMetaForm from "./components/BlogMetaForm";
import AuthorInfo from "./components/AuthorInfo";
import BlogActions from "./components/BlogActions";
import { toast } from "sonner";

export default function Page() {
  const onChange = (content) => {
    setContent(content);
    console.log(content);
  };

  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [meta, setMeta] = useState({
    title: "",
    slug: "",
    tags: "",
    date: "DECEMBER 9, 2025",
  });
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const author = {
    name: "Lê Tiến Đạt",
    role: "Author & Developer",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
  };

  const handleImageChange = (file, preview) => {
    setCoverImage(file);
    setCoverPreview(preview);
  };

  const handleRemoveImage = () => {
    setCoverImage(null);
    setCoverPreview(null);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const formData = new FormData();
      formData.append("coverImage", coverImage);
      formData.append("content", content);
      formData.append("meta", JSON.stringify(meta));

      // Call API here
      console.log("Saving...", { meta, content, coverImage });

      toast.success("Blog post published successfully!");
    } catch (error) {
      console.error("Save failed:", error);
      toast.error("Failed to publish blog post");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    toast.info("Bạn có chắc muốn hủy? Dữ liệu chưa lưu sẽ mất.");
    // Navigate back or reset
  };

  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* Content Area - scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-8 py-6 flex flex-col gap-10 pb-32">
          {/* Cover Image */}
          <CoverImageUpload
            preview={coverPreview}
            onImageChange={handleImageChange}
            onRemove={handleRemoveImage}
          />

          {/* Meta + Title */}
          <div className="flex flex-col items-center text-center gap-3 mt-4">
            <BlogMetaForm meta={meta} onChange={setMeta} />
            <AuthorInfo author={author} />
          </div>

          {/* Editor */}
          <RichTextEditor content={content} onChange={onChange} />
        </div>
      </div>

      {/* Fixed Bottom Bar - không scroll */}
      <div className="sticky bottom-0 w-full bg-linear-to-t from-background via-background/95 to-transparent backdrop-blur-lg border-t border-border/50 z-50">
        <div className="h-full flex items-center justify-center py-4">
          <BlogActions
            onCancel={handleCancel}
            onSave={handleSave}
            isSaving={isSaving}
          />
        </div>
      </div>
    </div>
  );
}
