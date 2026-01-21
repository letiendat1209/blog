"use client";
import { use } from "react";
import { usePost, useUpdatePost } from "@/hooks/posts/usePost";
import PostForm from "../components/PostForm";
import { toast } from "sonner";

export default function EditPostPage({ params }) {
  const { id } = use(params);
  const { post, loading } = usePost(id);

  if (loading) return <div>Loading...</div>;

  return <PostForm initialData={post} />;
}
