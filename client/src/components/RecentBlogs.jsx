import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function RecentBlogs() {
  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold font-mono">Recent Blogs</h2>
        <Link
          className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
          href="/blog"
        >
          View all <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <BlogCard
          href="/blog/first-post"
          title="Chào mừng anh em J2Team"
          date="3 Dec 2025"
          readTime="1 mins read"
          description="Post này để biết là web vẫn sống sau đợt ddos =))))) Thank kiu 500 ae đã ddos web của Khoa"
        />
      </div>
    </section>
  );
}

function BlogCard({ href, title, date, readTime, description }) {
  return (
    <Link href={href} className="group flex flex-col space-y-4">
      <div className="aspect-4/3 relative rounded-2xl overflow-hidden bg-muted">
        <Image
          fill
          alt={title}
          src="https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0"
        />
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center justify-center border w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none bg-black/50 hover:bg-black/70 text-white backdrop-blur-md border-none rounded-full px-3 py-1 text-xs font-medium">
            Fun
          </span>
        </div>
      </div>
      <div className="space-y-3 flex-1 flex flex-col">
        <div className="text-xs font-medium text-muted-foreground flex items-center gap-2">
          <span>{date}</span>
          <span className="w-1 h-1 rounded-full bg-muted-foreground/50"></span>
          <span>{readTime}</span>
        </div>
        <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed flex-1">
          {description}
        </p>
      </div>
    </Link>
  );
}
