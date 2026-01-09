"use client";

import { useState } from "react";
import RichTextEditor from "@/components/rich-text-editor/RichTextEditor";
import AuthorInfo from "../create/components/AuthorInfo";
import BlogActions from "../create/components/BlogActions";
import BlogMetaForm from "../create/components/BlogMetaForm";
import CoverImageUpload from "../create/components/CoverImageUpload";
import { useUploadImage } from "@/hooks/uploads/useUpload";
import { toast } from "sonner";
import { useAuth } from "@/hooks/auths/useAuth";

export default function PostForm({ initialData, onSave, onCancel, isSaving }) {
  const { user: currentUser, loading } = useAuth();

  // cover image
  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState(
    initialData?.coverImage || null
  );

  // meta info
  const [meta, setMeta] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    shortDescription: initialData?.shortDescription || "",
    seoTitle: initialData?.seoTitle || "",
    seoDescription: initialData?.seoDescription || "",
  });

  // content
  const [content, setContent] = useState(initialData?.content || "");

  // upload image hook
  const { uploadImage, isLoading: isUploading } = useUploadImage();

  const handleImageChange = (file, preview) => {
    setCoverImage(file); // File (để upload)
    setCoverPreview(preview); // URL (để preview)
  };

  const handleRemoveImage = () => {
    setCoverImage(null);
    setCoverPreview(null);
  };

  const handleSave = async () => {
    try {
      let coverImageUrl = coverPreview;

      // upload ảnh mới nếu có
      if (coverImage) {
        const uploadedUrl = await uploadImage(coverImage);

        if (!uploadedUrl) {
          throw new Error("Upload image failed");
        }

        coverImageUrl = uploadedUrl;
      }

      // backend auto-generate slug → FE KHÔNG gửi slug
      const postData = {
        title: meta.title,
        shortDescription: meta.shortDescription,
        seoTitle: meta.seoTitle || "",
        seoDescription: meta.seoDescription || "",
        content,
        coverImage: coverImageUrl,
      };

      await onSave?.(postData);
    } catch (error) {
      console.error("Error saving post:", error);
      toast.error("Có lỗi xảy ra khi lưu bài viết");
    }
  };

  const isProcessing = isSaving || isUploading;

  return (
    <div className="min-h-screen w-full flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-8 py-6 flex flex-col gap-10 pb-32">
          <CoverImageUpload
            preview={coverPreview}
            onImageChange={handleImageChange}
            onRemove={handleRemoveImage}
            isUploading={isProcessing}
          />

          <div className="w-full flex items-center flex-col gap-6 mt-4">
            <BlogMetaForm
              meta={meta}
              onChange={setMeta}
              disabled={isProcessing}
              disableSlug // 🔒 luôn khóa slug
            />

            <AuthorInfo
              author={initialData?.author ?? currentUser}
              loading={!initialData?.author && loading}
            />
          </div>

          <RichTextEditor
            content={content}
            onChange={setContent}
            disabled={isProcessing}
          />
        </div>
      </div>

      <div className="sticky bottom-0 w-full bg-linear-to-t from-background via-background/95 to-transparent backdrop-blur-lg border-t border-border/50 z-50">
        <div className="flex items-center justify-center py-4">
          <BlogActions
            onCancel={onCancel}
            onSave={handleSave}
            isSaving={isProcessing}
          />
        </div>
      </div>
    </div>
  );
}
