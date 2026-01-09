import Image from "next/image";

export default function AuthorInfo({ author }) {
  if (!author) {
    return (
      <div className="flex items-center gap-3 mt-2 opacity-70">
        <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
        <div className="text-left">
          <p className="text-sm font-medium">Unknown author</p>
          <p className="text-xs text-gray-500">—</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 mt-2">
      <Image
        alt={author.name || "avatar"}
        src={author.avatarUrl || "/avatar-placeholder.png"}
        width={32}
        height={32}
        className="rounded-full object-cover"
      />
      <div className="text-left">
        <p className="font-medium">{author.name}</p>
        {author.email && (
          <p className="text-xs text-gray-500">{author.email}</p>
        )}
      </div>
    </div>
  );
}
