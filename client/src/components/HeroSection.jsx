import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Github, Linkedin, File } from "lucide-react";
import SocialIcon from "./SocialIcon";

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center text-center justify-center space-y-8 md:py-32 max-w-4xl mx-auto">
      <div className="space-y-6">
        <h1 className="text-6xl md:text-8xl font-bold">Lê Tiến Đạt</h1>
      </div>
      <div className="max-w-3xl mx-auto">
        <p className="relative z-10 mx-auto mt-4 max-w-xl text-center text-neutral-800 dark:text-neutral-500">
          “Hi, tớ là Đạt — sinh viên NTTU, hướng đến Frontend/Fullstack
          Developer. Đây là portfolio đầu tiên dùng Next.js. T thích mấy tech
          mới và luôn thử nghiệm mấy thứ hay ho.”
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-6 pt-8 relative z-10">
        <Link href="/showcase">
          <button className="backdrop-blur-sm inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground hover:bg-primary/90 py-2 has-[>svg]:px-3 rounded-full px-8 h-12 text-base cursor-pointer">
            Showcase
          </button>
        </Link>
        <div className="flex gap-6">
          <SocialIcon href="/" Icon={Facebook} />
          <SocialIcon href="/" Icon={Instagram} />
          <SocialIcon href="/" Icon={Github} />
          <SocialIcon href="/" Icon={Linkedin} />
          <SocialIcon href="/" Icon={File} />
        </div>
      </div>
    </section>
  );
}
