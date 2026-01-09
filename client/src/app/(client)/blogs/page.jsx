"use client";

import { useState } from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import RecentBlogs from "@/components/client/blog/RecentBlogs";
import AllBlogs from "@/components/client/blog/AllBlog";
import { useGetAllTags } from "@/services/tag.service";

export default function BlogsPage() {
  const [selectedTags, setSelectedTags] = useState([]);

  const { tags, loading: tagsLoading } = useGetAllTags();

  const toggleTag = (slug) => {
    setSelectedTags((prev) =>
      prev.includes(slug) ? prev.filter((t) => t !== slug) : [...prev, slug]
    );
  };


  const clearTags = () => setSelectedTags([]);

  return (
    <div className="flex flex-col min-h-screen font-sans bg-background text-foreground relative">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <BackgroundBeams className="w-full h-screen" />
      </div>

      <main className="flex-1 relative z-10">
        <div className="container mx-auto px-4 py-12 md:py-20 max-w-7xl">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-20 space-y-6">
            <div className="space-y-4">
              <div className="text-sm font-medium text-primary uppercase tracking-wider">
                My Blog
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight font-serif">
                My Stories & Ideas
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl">
                The latest writings, news, technologies, and resources from me.
              </p>
            </div>

            {/* Search (chưa gắn logic) */}
            <div className="w-full max-w-md flex gap-2 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search article..."
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm pl-10 h-10"
                />
              </div>
            </div>
          </div>

          {/* TAG FILTER */}
          <div className="flex flex-wrap justify-center gap-2 mb-16 max-w-3xl mx-auto">
            <Button
              variant={selectedTags.length === 0 ? "default" : "outline"}
              className="rounded-3xl"
              onClick={clearTags}
            >
              All
            </Button>

            {!tagsLoading &&
              tags.map((tag) => {
                const active = selectedTags.includes(tag.slug);
                return (
                  <Button
                    key={tag.id}
                    variant={active ? "default" : "outline"}
                    className="rounded-3xl"
                    onClick={() => toggleTag(tag.slug)}
                  >
                    {tag.name}
                  </Button>
                );
              })}
          </div>

          {/* Recent */}
          {/* <RecentBlogs viewAll={false} /> */}

          {/* All Blogs */}
          <AllBlogs selectedTags={selectedTags} />
        </div>
      </main>
    </div>
  );
}
