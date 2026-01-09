"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatDate } from "@/utils/utils";
import { usePosts } from "@/hooks/posts/usePosts";
import { BlogCard, BlogSkeleton, ErrorState } from "./BlogCard";

export default function RecentBlogs({ viewAll = true }) {
  const { posts, loading } = usePosts({
    featured: true,
    status: "PUBLISHED",
    limit: 3,
  });

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold font-mono">Recent Blogs</h2>
        {viewAll && (
          <Link
            className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
            href="/blogs"
          >
            View all <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        )}
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
              date={formatDate(blog.createdAt)}
              readTime={`${blog.readTime || 5} min read`}
              description={blog.shortDescription}
            />
          ))}
        </div>
      )}
    </section>
  );
}
