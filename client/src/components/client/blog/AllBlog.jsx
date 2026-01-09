"use client";

import { BlogCard, BlogSkeleton, ErrorState } from "./BlogCard";
import { usePosts } from "@/hooks/posts/usePosts";
import { formatDate } from "@/utils/utils";

export default function AllBlogs({ selectedTags }) {
  const { posts, loading } = usePosts({
    status: "PUBLISHED",
    tags: selectedTags,
  });

  return (
    <section className="space-y-8 mt-12">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold font-mono">All Blogs</h2>
      </div>

      {loading && <BlogSkeleton />}

      {!loading && !posts.length && <ErrorState />}

      {!loading && posts.length > 0 && (
        <div className="grid gap-8 md:grid-cols-3">
          {posts.map((blog) => (
            <BlogCard
              key={blog.id}
              href={`/blogs/${blog.slug}-${blog.id}`}
              name={blog.title}
              src={blog.coverImage}
              excerpt={blog.title}
              tag={blog.tags?.[0]}
              date={formatDate(blog.publishedAt)}
              readTime={`${blog.readTime || 5} min read`}
              description={blog.shortDescription}
            />
          ))}
        </div>
      )}
    </section>
  );
}
