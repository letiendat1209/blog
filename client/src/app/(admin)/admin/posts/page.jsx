"use client";
import { PostsProvider } from "./components/posts-provider";
import { blogs } from "@/data/blog";
import { useRouter, useSearchParams } from "next/navigation";
import { PostsPrimaryButtons } from "./components/posts-primary-buttons";
import { PostsTable } from "./components/posts-table";
import { PostsDialogs } from "./components/posts-dialogs";

const data = blogs;

export default function Blogs() {
  const search = useSearchParams();
  const router = useRouter();

  return (
    <>
      <PostsProvider>
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Post List</h2>
            <p className="text-muted-foreground">Manage your blogs here...</p>
          </div>
          <PostsPrimaryButtons />
        </div>

        <PostsTable data={data} search={search} navigate={router} />
        <PostsDialogs />
      </PostsProvider>
    </>
  );
}
