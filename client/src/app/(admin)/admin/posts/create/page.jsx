"use client";

import { toast } from "sonner";
import PostForm from "../components/PostForm";
import { useCreatePost } from "@/hooks/posts/usePost";
import { useRouter } from "next/navigation";

export default function NewPostPage() {
  const router = useRouter();
  const { createPostAsync, loading } = useCreatePost();

  const handleCreate = async (postData) => {
    if (!postData.title?.trim()) {
      toast.error("Thiếu tiêu đề kìa bro 😤");
      return;
    }

    if (!postData.content?.trim()) {
      toast.error("Content trống rồi đăng gì 😭");
      return;
    }

    try {
      await createPostAsync(postData);

      toast.success("Tạo bài viết thành công 🚀");
      router.push("/admin/posts");
    } catch (error) {
      console.error(error);
      toast.error("Tạo bài viết thất bại 💀");
    }
  };

  return (
    <PostForm
      initialData={null}
      onSave={handleCreate}
      onCancel={() => router.back()}
      isSaving={loading}
    />
  );
}
