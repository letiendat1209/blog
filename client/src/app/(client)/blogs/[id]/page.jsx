import { blogs } from "@/data/blog";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import CommentSection from "@/components/client/CommentSection";

export default async function SingleBlogPage({ params }) {
  const { id } = await params;
  const blog = blogs.find((b) => b.slug === id);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Bài viết không tồn tại.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen font-sans bg-background text-foreground">
      {/* Cover */}
      <div className="relative w-full h-[300px] md:h-[380px] overflow-hidden">
        <Image
          alt={blog.name}
          src={blog.coverImage}
          fill
          className="object-cover brightness-[.75]"
          priority
        />

        {/* Title + short description overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-md">
            {blog.name}
          </h1>
          <p className="mt-4 text-white/80 max-w-2xl text-lg">
            {blog.shortDescription}
          </p>
        </div>
      </div>

      {/* Body */}
      <main className="w-full flex justify-center px-4">
        <div className="container mx-auto px-4 py-12 md:py-20 relative overflow-x-hidden">
          {/* Meta Header */}
          <div className="flex items-center gap-4 mb-10">
            <Image
              src={blog.authorImage}
              alt={blog.author}
              width={46}
              height={46}
              className="rounded-full"
            />

            <div className="flex flex-col">
              <Link
                href={blog.authorLink}
                className="font-semibold hover:underline"
              >
                {blog.author}
              </Link>

              <span className="text-sm text-muted-foreground">
                {blog.date} • {blog.readTime}
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
          <article className="prose prose-neutral dark:prose-invert max-w-none prose-img:rounded-xl">
            {/* Bạn có thể render markdown sau bằng react-markdown */}
            <div className="prose dark:prose-invert max-w-none prose-img:rounded-xl tracking-wide">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
              >
                {blog.content}
              </ReactMarkdown>
            </div>
          </article>
          {/* Comments */}
          <div className="mt-16 pt-8 border-t border-border/40">
            <CommentSection />
          </div>

          {/* Related Posts */}
          {blog.relatedPosts?.length > 0 && (
            <div className="mt-16">
              <h3 className="text-xl font-semibold mb-4">Bài viết liên quan</h3>
              <div className="grid gap-4">
                {blog.relatedPosts.map((relatedId) => {
                  const related = blogs.find((b) => b.id === relatedId);
                  if (!related) return null;

                  return (
                    <Link
                      key={related.id}
                      href={`/blog/${related.slug}`}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted transition"
                    >
                      <Image
                        src={related.coverImage}
                        alt={related.name}
                        width={70}
                        height={70}
                        className="rounded-md object-cover"
                      />
                      <div>
                        <p className="font-medium">{related.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {related.shortDescription}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
