import Image from "next/image";

export default function AuthorInfo({ author }) {
  return (
    <div className="flex items-center gap-3 mt-2">
      <Image
        alt={author.name}
        src={author.avatar}
        width={32}
        height={32}
        className="rounded-full"
      />
      <div className="text-left">
        <p className="font-medium">{author.name}</p>
        <p className="text-xs text-gray-500">{author.role}</p>
      </div>
    </div>
  );
}
