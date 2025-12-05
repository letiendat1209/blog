"use client";
import AboutSection from "@/components/AboutSection";
import { BackToTop } from "@/components/backtotop";
import { CmdKHint } from "@/components/cmdkhint";
import { Footer } from "@/components/footer";
import HeroSection from "@/components/HeroSection";
import RecentBlogs from "@/components/RecentBlogs";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { GitFork, Star, ArrowRight, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-background text-foreground relative">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <BackgroundBeams className="w-full h-full" />
      </div>
      <div className="absolute inset-0 z-5 pointer-events-none" />
      <main className="flex-1 relative z-10">
        <div className="container mx-auto px-4 py-12 md:py-24 max-w-7xl space-y-32">
          <HeroSection />
          {/* ABOUT ME */}
          <AboutSection />
          {/*Recent Blog*/}
          <RecentBlogs />
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
            <div className="text-center mt-10">
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href=""
              >
                <button
                  title="view all repositories"
                  className="backdrop-blur-sm inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-10 rounded-md px-6 has-[&gt;svg]:px-4 gap-2"
                >
                  View All Repositories{" "}
                  <ArrowRight size={16} className="text-primary" />
                </button>
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
      <CmdKHint />
      <BackToTop />
    </div>
  );
}
