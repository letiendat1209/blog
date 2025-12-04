"use client";
import { Navbar } from "@/components/navbar";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { GitFork } from "lucide-react";
import { ArrowUp } from "lucide-react";
import { Mail } from "lucide-react";
import { Star } from "lucide-react";
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
          <section className="flex flex-col items-center text-center justify-center space-y-8 md:py-32 max-w-4xl mx-auto">
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
              <Link href="/showcase">
                <button
                  data-slot="button"
                  className="backdrop-blur-sm inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground hover:bg-primary/90 py-2 has-[&gt;svg]:px-3 rounded-full px-8 h-12 text-base cursor-pointer"
                >
                  Showcase
                </button>
              </Link>
              <div className="flex gap-6">
                <Link
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors p-1"
                  data-state="closed"
                >
                  <Facebook />
                </Link>
                <Link
                  href="https://www.instagram.com/yun.khngn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors p-1"
                  data-state="closed"
                >
                  <Instagram />
                </Link>
                <Link
                  href="https://github.com/yunkhngn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors p-1"
                  data-state="closed"
                >
                  <Github />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/yunkhngn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors p-1"
                  data-state="closed"
                >
                  <Linkedin />
                </Link>
                <Link
                  href="https://yunkhngn.dev/resume"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors p-1"
                  data-state="closed"
                >
                  <File />
                </Link>
              </div>
            </div>
          </section>
          {/* ABOUT ME */}
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
          {/*Recent Blog*/}
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

          {/*Featured Project*/}
          <section className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold font-mono">Featured Project</h2>
              <Link
                className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
                href="/FeaturedProject"
              >
                View all <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]">
              <Link
                className="group relative rounded-2xl overflow-hidden bg-muted md:col-span-2 md:row-span-2"
                href="/FeaturedProject"
              >
                <Image
                  fill
                  alt="Lê Tiến Đạt"
                  src="https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <h3 className="font-bold text-white mb-2 text-2xl md:text-3xl">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </h3>
                  <p className="text-gray-200 line-clamp-2 mb-3 max-w-md">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Aperiam vel veritatis dolor id dolore voluptate illum
                    quaerat veniam! Amet beatae suscipit, unde reprehenderit
                    nemo itaque rem recusandae fugit cumque odit!
                  </p>
                </div>
                <div className="text-gray-200 line-clamp-2 mb-3 max-w-md"></div>
              </Link>
              <Link
                className="group relative rounded-2xl overflow-hidden bg-muted md:col-span-1 md:row-span-1"
                href="/FeaturedProject"
              >
                <Image
                  fill
                  alt="Lê Tiến Đạt"
                  src="https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <h3 className="font-bold text-white mb-2 text-lg">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </h3>
                </div>
                <div className="text-gray-200 line-clamp-2 mb-3 max-w-md"></div>
              </Link>
            </div>
          </section>
          {/*Featured Open Source*/}
          <section className="container mx-auto px-4 py-20">
            <h2 className="text-3xl font-bold mb-12 text-center font-mono flex items-center justify-center gap-3">
              <Github />
              Featured Open Source
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/" className="group block h-full">
                <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm h-full hover:border-primary transition-colors">
                  <div className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6">
                    <div className="font-semibold flex items-center justify-between text-lg">
                      <span className="group-hover:text-primary transition-colors line-clamp-1">
                        Lorems is spums
                      </span>
                      <span className="inline-flex items-center justify-center rounded-full border px-2 py-0.5 w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90 font-normal text-xs">
                        JavaScript
                      </span>
                    </div>
                  </div>
                  <div className="px-6 space-y-4">
                    <p className="text-muted-foreground text-sm line-clamp-2 h-10">
                      Personal guestbook project for everyone!
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star size={16} className="text-yellow-500" /> 11
                      </div>
                      <div className="flex items-center gap-1">
                        <GitFork size={16} className="text-blue-500" /> 11
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div class="text-center mt-10">
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/yunkhngn?tab=repositories"
              >
                <button
                  title="view all repositories"
                  class="backdrop-blur-sm inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-10 rounded-md px-6 has-[&gt;svg]:px-4 gap-2"
                >
                  View All Repositories{" "}
                  <ArrowRight size={16} className="text-primary" />
                </button>
              </Link>
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-background border-t border-border pt-16 pb-8 w-full relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 mb-12">
            <div className="lg:w-1/2 flex flex-col justify-between">
              <Link
                class="font-mono text-2xl font-bold flex items-center gap-1 mb-4 hover:opacity-80 transition-opacity"
                href="/"
              >
                <span class="text-primary">&gt;</span>
                <span class="text-foreground">letiendat</span>
                <span class="text-primary animate-pulse">_</span>
              </Link>
              <div class="text-muted-foreground mb-6 max-w-sm whitespace-pre-wrap">
                Full Stack Developer building beautiful web experiences. Sharing
                knowledge and journey through code.
              </div>
              <div class="flex gap-4 mt-auto">
                <Link
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-10 h-10 rounded-full bg-[#F6E8D2] flex items-center justify-center text-[#42475B] hover:bg-primary hover:text-white transition-all duration-300"
                  aria-label="Facebook"
                >
                  <Facebook size={16} />
                </Link>
                <Link
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-10 h-10 rounded-full bg-[#F6E8D2] flex items-center justify-center text-[#42475B] hover:bg-primary hover:text-white transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Instagram size={16} />
                </Link>
                <Link
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-10 h-10 rounded-full bg-[#F6E8D2] flex items-center justify-center text-[#42475B] hover:bg-primary hover:text-white transition-all duration-300"
                  aria-label="Github"
                >
                  <Github size={16} />
                </Link>
                <Link
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-10 h-10 rounded-full bg-[#F6E8D2] flex items-center justify-center text-[#42475B] hover:bg-primary hover:text-white transition-all duration-300"
                  aria-label="Linkedin"
                >
                  <Linkedin size={16} />
                </Link>
                <Link
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-10 h-10 rounded-full bg-[#F6E8D2] flex items-center justify-center text-[#42475B] hover:bg-primary hover:text-white transition-all duration-300"
                  aria-label="Email"
                >
                  <Mail size={16} />
                </Link>
              </div>
            </div>
            <div className="hidden lg:block w-px bg-border mx-4 h-auto min-h-full"></div>
            <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-foreground mb-4">Explore</h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      className="text-muted-foreground hover:text-primary transition-colors"
                      href="/project"
                    >
                      Project
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-muted-foreground hover:text-primary transition-colors"
                      href="/blog"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-muted-foreground hover:text-primary transition-colors"
                      href="/photo"
                    >
                      Photo
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-muted-foreground hover:text-primary transition-colors"
                      href="/about"
                    >
                      About Me
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-muted-foreground hover:text-primary transition-colors"
                      href="/showcase"
                    >
                      Showcase
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-4">Connect</h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      className="text-muted-foreground hover:text-primary transition-colors"
                      href="/contact"
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-muted-foreground hover:text-primary transition-colors"
                      href="/resume"
                    >
                      Resume
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-muted-foreground hover:text-primary transition-colors"
                      href="/"
                    >
                      Email Me
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2025 Le Tien Dat. All rights reserved.</p>
            <div className="flex gap-6">
              <a
                className="hover:text-primary transition-colors"
                href="/privacy"
              >
                Privacy Policy
              </a>
              <a className="hover:text-primary transition-colors" href="/terms">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
      {/*Menu mini search*/}
      <div className="fixed bottom-6 left-6 hidden md:flex items-center gap-2 px-4 py-2 rounded-2xl border bg-background/40 backdrop-blur-md shadow-sm text-sm text-muted-foreground pointer-events-none z-50 select-none">
        <span>Press</span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
        <span>to search</span>
      </div>

      <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-50 items-end">
        <button className="backdrop-blur-sm gap-2 whitespace-nowrap text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive px-4 py-2 has-[>svg]:px-3 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:bg-primary/90 transition-all duration-300 transform opacity-100 translate-y-0">
          <ArrowUp size={16}/>
        </button>
      </div>
    </div>
  );
}
