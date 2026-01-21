"use client";
import AboutSection from "@/components/client/AboutSection";
import { BackToTop } from "@/components/client/backtotop";
import { CmdKHint } from "@/components/client/cmdkhint";
import { FeaturedProject } from "@/components/client/FeatureProject";
import { Footer } from "@/components/client/footer";
import HeroSection from "@/components/client/HeroSection";
import RecentBlogs from "@/components/client/blog/RecentBlogs";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { GitFork, Star, ArrowRight, Github } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch(
          "https://api.github.com/users/letiendat1209/repos?per_page=100",
        );
        const data = await res.json();

        const featured = data
          .filter(
            (repo) =>
              !repo.fork && repo.description && repo.stargazers_count > 0,
          )
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 6);

        setRepos(featured);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);
  return (
    <div className="flex flex-col min-h-screen font-sans bg-background text-foreground relative">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <BackgroundBeams className="w-full h-screen" />
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
          {/* <FeaturedProject /> */}
          {/*Featured Open Source*/}
          <section className="container mx-auto px-4 py-20">
            <h2 className="text-3xl font-bold mb-12 text-center font-mono flex items-center justify-center gap-3">
              <Github />
              Featured Open Source
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading &&
                Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-40 rounded-xl border bg-card animate-pulse"
                  />
                ))}

              {!loading &&
                repos.map((repo) => (
                  <Link
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block h-full"
                  >
                    <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm h-full hover:border-primary transition-colors">
                      <div className="px-6 flex items-center justify-between gap-2">
                        <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
                          {repo.name}
                        </h3>
                        {repo.language && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                            {repo.language}
                          </span>
                        )}
                      </div>

                      <div className="px-6 space-y-4">
                        <p className="text-muted-foreground text-sm line-clamp-2 h-10">
                          {repo.description}
                        </p>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Star size={16} className="text-yellow-500" />
                            {repo.stargazers_count}
                          </div>
                          <div className="flex items-center gap-1">
                            <GitFork size={16} className="text-blue-500" />
                            {repo.forks_count}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>

            <div className="text-center mt-10">
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/letiendat1209?tab=repositories"
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
