"use client";
import { Navbar } from "@/components/navbar";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import {
  File,
  ArrowRight,
  Linkedin,
  Github,
  Instagram,
  Facebook,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-background text-foreground relative">
      <div className="absolute top-0 left-0 w-full h-screen overflow-hidden z-0">
        <BackgroundRippleEffect cellSize={56} />
      </div>
      <Navbar />

      <main className="flex-1 relative z-10">
        <div className="container mx-auto px-4 py-12 md:py-24 max-w-7xl space-y-32">
          <section className="flex flex-col items-center text-center justify-center space-y-8 py-20 md:py-32 max-w-4xl mx-auto">
            <div className="space-y-6">
              <h1 className="text-6xl md:text-8xl font-bold">Lê Tiến Đạt</h1>
            </div>
            <div className="max-w-3xl mx-auto">
              <p className="relative z-10 mx-auto mt-4  max-w-xl text-center text-neutral-800 dark:text-neutral-500">
                “Hi, tớ là Đạt — sinh viên NTTU, hướng đến Frontend/Fullstack
                Developer. Đây là portfolio đầu tiên dùng Next.js. T thích mấy
                tech mới và luôn thử nghiệm mấy thứ hay ho.”
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 pt-8 relative z-10">
              <a href="/showcase">
                <button
                  data-slot="button"
                  className="backdrop-blur-sm inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground hover:bg-primary/90 py-2 has-[&gt;svg]:px-3 rounded-full px-8 h-12 text-base cursor-pointer"
                >
                  Showcase
                </button>
              </a>
              <div className="flex gap-6">
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors p-1"
                  data-state="closed"
                >
                  <Facebook />
                </a>
                <a
                  href="https://www.instagram.com/yun.khngn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors p-1"
                  data-state="closed"
                >
                  <Instagram />
                </a>
                <a
                  href="https://github.com/yunkhngn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors p-1"
                  data-state="closed"
                >
                  <Github />
                </a>
                <a
                  href="https://www.linkedin.com/in/yunkhngn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors p-1"
                  data-state="closed"
                >
                  <Linkedin />
                </a>
                <a
                  href="https://yunkhngn.dev/resume"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors p-1"
                  data-state="closed"
                >
                  <File />
                </a>
              </div>
            </div>
          </section>

          <section className="max-w-3xl mx-auto space-y-12 text-lg leading-relaxed text-gray-600 dark:text-gray-300 font-medium">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-background shadow-xl">
                <Image
                  width={200}
                  height={200}
                  alt="Lê Tiến Đạt"
                  loading="lazy"
                  className="object-cover"
                  src="https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/163050864_3003938323264883_2617536581490542695_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=5eD_gf3iDCcQ7kNvwG_lEgs&_nc_oc=AdkUtWED0IHyoibnUVNVXEGSHHiEopvalUgxm3VR7iH2VS70pgVlf_mPmAjd1OwphjoN3sAq5IWmRsz87gbGEOQZ&_nc_zt=23&_nc_ht=scontent.fsgn2-9.fna&_nc_gid=nBIkd8slpsYyF8eGV2FBXw&oh=00_AfmTAcLFIGS_anhnMQ3x6Y09E1qMGN7Sz7mLv3ZQr9r7nQ&oe=69371110"
                />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl md:text-4xl font-bold font-mono text-foreground">
                  Lê Tiến Đạt
                </h2>
                <p className="text-muted-foreground text-base md:text-lg">
                  Software Developer • Frontend Developer
                </p>
              </div>
            </div>
            <div className="whitespace-pre-wrap">
              Xin chào, tớ là Lê Tiến Đạt (bot), sinh viên chuyên ngành Kỹ thuật
              phần mềm tại Đại học Nguyễn Tất Thành. Hiện tại tớ đang là sinh
              viên năm cuối và đang cố gắng trở thành Frontend Developer. Tương
              lai tớ muốn trở thành 1 Fullstack Developer và thực hiện thêm
              nhiều ước mơ phía trước. Đây là portfolio và cũng là dự án đầu
              tiên sử dụng NextJS của tớ XD, tớ thích những công nghệ mới và
              luôn tìm tòi để áp dụng.
            </div>
          </section>

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
              <Link
                href="/blog/first-post"
                className="group flex flex-col space-y-4"
              >
                <div className="aspect-4/3 relative rounded-2xl overflow-hidden bg-muted">
                  <Image
                    fill
                    alt="Lê Tiến Đạt"
                    src="https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center justify-center border w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-transparent [a&]:hover:bg-secondary/90 bg-black/50 hover:bg-black/70 text-white backdrop-blur-md border-none rounded-full px-3 py-1 text-xs font-medium">
                      Fun
                    </span>
                  </div>
                </div>
                <div className="space-y-3 flex-1 flex flex-col">
                  <div className="text-xs font-medium text-muted-foreground flex items-center gap-2">
                    <span>3 Dec 2025</span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/50"></span>
                    <span>1 mins read</span>
                  </div>
                  <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                    Chào mừng anh em J2Team
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed flex-1">
                    Post này để biết là web vẫn sống sau đợt ddos =))))) Thank
                    kiu 500 ae đã ddos web của Khoa
                  </p>
                </div>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
