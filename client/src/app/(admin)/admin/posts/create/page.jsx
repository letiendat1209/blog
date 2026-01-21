"use client";

import { useRouter } from "next/navigation";
import PostForm from "../components/PostForm";

export default function NewPostPage() {
  const router = useRouter();

  return <PostForm initialData={null} onCancel={() => router.back()} />;
}
