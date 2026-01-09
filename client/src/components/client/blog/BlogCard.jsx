  import Image from "next/image";
  import Link from "next/link";

  export const BlogCard = ({
    href,
    src,
    name,
    excerpt,
    tag,
    date,
    readTime,
    description,
  }) => {
    return (
      <Link href={href} className="group flex flex-col space-y-4">
        <div className="aspect-4/3 relative rounded-2xl overflow-hidden bg-muted">
          <Image alt={name} fill src={src} />
          <div className="absolute top-4 left-4">
            {tag && (
              <span className="inline-flex items-center justify-center border w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none bg-black/50 hover:bg-black/70 text-white backdrop-blur-md border-none rounded-full px-3 py-1 text-xs font-medium">
                {tag}
              </span>
            )}
          </div>
        </div>
        <div className="space-y-3 flex-1 flex flex-col">
          <div className="text-xs font-medium text-muted-foreground flex items-center gap-2">
            <span>{date}</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/50"></span>
            <span>{readTime}</span>
          </div>
          <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
            {excerpt}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed flex-1">
            {description}
          </p>
        </div>
      </Link>
    );
  }

  export const BlogSkeleton = () => {
    return (
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid gap-8 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="animate-pulse space-y-4 rounded-2xl">
              <div className="aspect-4/3 w-full rounded-2xl bg-muted" />
              <div className="h-5 w-3/4 rounded bg-muted" />
              <div className="h-4 w-5/6 rounded bg-muted" />
            </div>
          ))}
        </div>
      </div>
    );
  };


  export const ErrorState = () => {
    return (
      <div className="flex h-40 flex-col items-center justify-center gap-2 text-center">
        <p className="text-sm font-medium text-destructive">
          Oops! Không load được blog 😢
        </p>
        <p className="text-xs text-muted-foreground">Thử refresh lại trang nha</p>
      </div>
    );
  }

