import Link from "next/link";

export default function SocialIcon({ href, Icon }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-muted-foreground hover:text-foreground transition-colors p-1"
    >
      <Icon />
    </Link>
  );
}
