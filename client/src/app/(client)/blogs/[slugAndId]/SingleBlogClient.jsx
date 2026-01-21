"use client";

import Image from "next/image";
import Link from "next/link";
import CommentSection from "@/components/client/CommentSection";
import { usePost } from "@/hooks/posts/usePost";
import { useMemo, useEffect, useState } from "react";
import { formatDate } from "@/utils/utils";
import { useTrackPostView } from "@/hooks/posts/useTrackPostView";

export default function SingleBlogPage({ slugAndId }) {
  const [sanitizedContent, setSanitizedContent] = useState("");

  const { postId, slugFromUrl } = useMemo(() => {
    if (!slugAndId) return { postId: null, slugFromUrl: null };

    const UUID_LENGTH = 36;

    const postId = slugAndId.slice(-UUID_LENGTH);
    const slugFromUrl = slugAndId.slice(0, -(UUID_LENGTH + 1));

    return { postId, slugFromUrl };
  }, [slugAndId]);
  useTrackPostView(postId);
  const { post: blog, loading, error } = usePost(postId);

  // Sanitize content on client side
  useEffect(() => {
    if (blog?.content) {
      import("dompurify").then((DOMPurify) => {
        const clean = DOMPurify.default.sanitize(blog.content, {
          ADD_TAGS: ["iframe"],
          ADD_ATTR: [
            "allow",
            "allowfullscreen",
            "frameborder",
            "scrolling",
            "src",
            "width",
            "height",
          ],
          ALLOWED_URI_REGEXP:
            /^(?:(?:https?:)?\/\/)?(?:www\.)?(youtube\.com|youtu\.be)\/?/,
        });

        setSanitizedContent(clean);
      });
    }
  }, [blog?.content]);


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Không tìm thấy bài viết</h2>
          <p className="text-muted-foreground mb-4">
            Bài viết không tồn tại hoặc đã bị xóa
          </p>
          <Link href="/" className="text-primary hover:underline">
            Quay về trang chủ
          </Link>
        </div>
      </div>
    );
  }

  // SEO canonical redirect
  if (slugFromUrl !== blog.slug) {
    window.location.replace(`/blogs/${blog.slug}-${blog.id}`);
    return null;
  }
  return (
    <div className="flex flex-col min-h-screen font-sans bg-background">
      {/* Cover */}
      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        <Image
          alt={blog.title}
          src={blog.coverImage}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/50 to-black/70" />
        {/* Title + short description overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <div className="max-w-4xl space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-2xl leading-tight">
              {blog.title}
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              {blog.shortDescription}
            </p>
          </div>
        </div>
      </div>
      {/* Body */}
      <main className="w-full flex justify-center px-2 ">
        <div className="max-w-4xl px-1 py-12 md:py-20 relative overflow-x-hidden">
          {/* Meta Header */}
          <div className="flex items-center gap-4 mb-10">
            <Image
              src={blog.author.avatarUrl}
              alt={blog.author.name}
              width={46}
              height={46}
              className="rounded-full"
            />

            <div className="flex flex-col">
              <Link href="/" className="font-semibold hover:underline">
                {blog.author.email}
              </Link>

              <span className="text-sm text-muted-foreground">
                {formatDate(blog.publishedAt) || formatDate(blog.upDatedAt)} •{" "}
                {`${blog.readTime || 5} min read`}
              </span>
            </div>
          </div>

          {/* Tags */}

          {blog.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs rounded-full bg-muted text-muted-foreground"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Stats */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground mb-10">
            <span>{blog.views} views</span>
            <span>{blog.likes} likes</span>
            <span className="px-2 py-0.5 bg-muted rounded-md text-xs">
              {blog.category}
            </span>
          </div>

          {/* Article */}
          <article className="tiptap-content">
            <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
          </article>
          {/* Action buttons */}
          
          {/* Comments */}
          <div className="mt-16 pt-8 border-t border-border/40">
            <CommentSection postId={blog.id} />
          </div>

          {/* Related Posts */}
          
        </div>
      </main>
      {/* Tiptap Styles */}
      <style jsx global>{`
        .tiptap-content {
          max-width: none;
          line-height: 1.75;
        }

        .tiptap-content > div {
          outline: none;
        }

        .tiptap-content p {
          margin: 1rem 0;
          line-height: 1.75;
        }

        .tiptap-content h1 {
          font-size: 2em;
          font-weight: bold;
          margin: 1.5em 0 0.67em;
          line-height: 1.2;
        }

        .tiptap-content h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin: 1.3em 0 0.83em;
          line-height: 1.3;
        }

        .tiptap-content h3 {
          font-size: 1.17em;
          font-weight: bold;
          margin: 1.2em 0 1em;
          line-height: 1.4;
        }

        .tiptap-content h4 {
          font-size: 1em;
          font-weight: bold;
          margin: 1.33em 0;
          line-height: 1.5;
        }

        .tiptap-content ul,
        .tiptap-content ol {
          padding-left: 1.5rem;
          margin: 1rem 0;
        }

        .tiptap-content ul {
          list-style-type: disc;
        }

        .tiptap-content ol {
          list-style-type: decimal;
        }

        .tiptap-content ul li,
        .tiptap-content ol li {
          margin: 0.25rem 0;
          line-height: 1.75;
        }

        .tiptap-content ul[data-type="taskList"] {
          list-style: none;
          padding: 0;
        }

        .tiptap-content ul[data-type="taskList"] li {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
        }

        .tiptap-content ul[data-type="taskList"] li > label {
          flex: 0 0 auto;
          margin-right: 0.5rem;
          user-select: none;
        }

        .tiptap-content ul[data-type="taskList"] li > div {
          flex: 1 1 auto;
        }

        .tiptap-content blockquote {
          border-left: 4px solid #d1d5db;
          padding-left: 1rem;
          margin: 1.5rem 0;
          font-style: italic;
          color: #4b5563;
        }

        .tiptap-content code {
          background-color: #f3f4f6;
          color: #dc2626;
          padding: 0.25em 0.4em;
          border-radius: 0.25rem;
          font-size: 0.9em;
          font-family: "Courier New", monospace;
        }

        .tiptap-content pre {
          background: #1a1a1a;
          color: #ffffff;
          padding: 1rem;
          border-radius: 0.5rem;
          margin: 1.5rem 0;
          overflow-x: auto;
        }

        .tiptap-content pre code {
          background: none;
          color: inherit;
          padding: 0;
          font-size: 0.875rem;
        }

        .tiptap-content img {
          display: block;
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 1.5rem auto;
        }

        .tiptap-content iframe {
          max-width: 100%;
          border-radius: 0.5rem;
          margin: 1.5rem auto;
          display: block;
        }

        .tiptap-content a {
          color: #2563eb;
          text-decoration: underline;
          cursor: pointer;
        }

        .tiptap-content a:hover {
          color: #1d4ed8;
        }

        .tiptap-content mark {
          background-color: #fef08a;
          padding: 0 0.25rem;
          border-radius: 0.125rem;
        }

        .tiptap-content hr {
          border: none;
          border-top: 2px solid #e5e7eb;
          margin: 2rem 0;
        }

        .tiptap-content sub {
          font-size: 0.75em;
          vertical-align: sub;
        }

        .tiptap-content sup {
          font-size: 0.75em;
          vertical-align: super;
        }

        .tiptap-content u {
          text-decoration: underline;
        }

        .tiptap-content s {
          text-decoration: line-through;
        }

        .tiptap-content strong {
          font-weight: bold;
        }

        .tiptap-content em {
          font-style: italic;
        }

        /* Text alignment */
        .tiptap-content [style*="text-align: left"] {
          text-align: left;
        }

        .tiptap-content [style*="text-align: center"] {
          text-align: center;
        }

        .tiptap-content [style*="text-align: right"] {
          text-align: right;
        }

        .tiptap-content [style*="text-align: justify"] {
          text-align: justify;
        }
      `}</style>
    </div>
  );
}
