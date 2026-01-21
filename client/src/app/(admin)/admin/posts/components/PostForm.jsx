"use client";

import { useState, useEffect } from "react";
import RichTextEditor from "@/components/rich-text-editor/RichTextEditor";
import AuthorInfo from "../create/components/AuthorInfo";
import BlogActions from "../create/components/BlogActions";
import BlogMetaForm from "../create/components/BlogMetaForm";
import CoverImageUpload from "../create/components/CoverImageUpload";
import TagInput from "./TagInput";

import { useUploadImage } from "@/hooks/uploads/useUpload";
import { useAuth } from "@/hooks/auths/useAuth";
import { useCreatePost, useUpdatePost } from "@/hooks/posts/usePost";
import { useChangePostStatus } from "@/hooks/posts/useChangePostStatus";

import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function PostForm({ initialData, onCancel }) {
  const router = useRouter();

  const { user: currentUser, loading: loadingUser } = useAuth();
  const { uploadImage, isLoading: isUploading } = useUploadImage();
  const { createPostAsync, loading: isCreating } = useCreatePost();
  const { updatePostAsync, loading: isUpdating } = useUpdatePost();
  const { changeStatus } = useChangePostStatus();

  const postId = initialData?.id;
  const status = initialData?.status ?? "DRAFT";

  // ===== state =====
  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState(
    initialData?.coverImage || null,
  );

  const [meta, setMeta] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    shortDescription: initialData?.shortDescription || "",
    seoTitle: initialData?.seoTitle || "",
    seoDescription: initialData?.seoDescription || "",
    tags: initialData?.tags || [],
  });

  const [content, setContent] = useState(initialData?.content || "");

  const isProcessing = isUploading || isCreating || isUpdating;

  // ===== helpers =====
  const handleImageChange = (file, preview) => {
    setCoverImage(file);
    setCoverPreview(preview);
  };

  const handleRemoveImage = () => {
    setCoverImage(null);
    setCoverPreview(null);
  };

  const buildPostData = async () => {
    let coverImageUrl = coverPreview;

    if (coverImage) {
      const uploadedUrl = await uploadImage(coverImage);
      if (!uploadedUrl) throw new Error("Upload image failed");
      coverImageUrl = uploadedUrl;
    }

    return {
      title: meta.title,
      shortDescription: meta.shortDescription,
      seoTitle: meta.seoTitle,
      seoDescription: meta.seoDescription,
      content,
      coverImage: coverImageUrl,
      tags: meta.tags, // FE gửi lên
    };
  };

  // ===== actions =====
  const handleSave = async () => {
    try {
      const postData = await buildPostData();

      // CREATE
      if (!postId) {
        const created = await createPostAsync(postData);
        toast.success("Đã tạo bài viết ✨");

        // redirect sang edit
        router.replace(`/admin/posts/${created.id}/edit`);
        return;
      }

      // UPDATE
      await updatePostAsync({ id: postId, data: postData });
      toast.success("Đã lưu bài viết 💾");
    } catch (err) {
      console.error(err);
      toast.error("Lưu bài viết thất bại");
    }
  };

  const handlePublish = async () => {
    try {
      await handleSave();

      if (!postId) return;
      await changeStatus({ id: postId, action: "publish" });

      toast.success("Publish thành công 🚀");
    } catch {
      toast.error("Publish thất bại");
    }
  };

  const handleArchive = async () => {
    if (!postId) return;

    try {
      await changeStatus({ id: postId, action: "archive" });
      toast.success("Đã archive bài viết 🗄️");
    } catch {
      toast.error("Archive thất bại");
    }
  };

  // ===== render =====
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
              disableSlug
            />

            <AuthorInfo
              author={initialData?.author ?? currentUser}
              loading={!initialData?.author && loadingUser}
            />
          </div>

          <RichTextEditor
            content={content}
            onChange={setContent}
            disabled={isProcessing}
          />

          {/* Tags */}
          <TagInput
            value={meta.tags}
            onChange={(tags) =>
              setMeta((prev) => ({
                ...prev,
                tags,
              }))
            }
            disabled={isProcessing}
          />
        </div>
      </div>

      {/* actions */}
      <div className="sticky bottom-0 w-full bg-linear-to-t from-background via-background/95 to-transparent backdrop-blur-lg border-t border-border/50 z-50">
        <div className="flex items-center justify-center py-4">
          <BlogActions
            onCancel={onCancel}
            onSaveDraft={handleSave} // save
            onPublish={handlePublish}
            onArchive={handleArchive}
            isSaving={isProcessing}
            status={status}
          />
        </div>
      </div>
    </div>
  );
}
