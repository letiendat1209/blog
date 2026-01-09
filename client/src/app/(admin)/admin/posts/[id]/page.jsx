"use client";
import { use } from "react";
import { usePost, useUpdatePost } from "@/hooks/posts/usePost";
import PostForm from "../components/PostForm";
import { toast } from "sonner";

export default function EditPostPage({ params }) {
  const { id } = use(params);
  const { post, loading: loadingPost } = usePost(id);
  const { updatePostAsync, loading } = useUpdatePost();

  if (loadingPost) return <div>Loading...</div>;

  const handleUpdate = async (formData) => {
    try {
      await updatePostAsync({
        id: id,
        data: formData,
      });
      toast.success("Cập nhật thành công ✨");
    } catch (err) {
      toast.error("Update fail rồi 😭");
    }
  };

  return (
    <PostForm initialData={post} onSave={handleUpdate} isSaving={loading} />
  );
}
