import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function BlogsPage() {
  return (
    <div className="relative min-h-screen flex flex-col font-sans bg-background text-foreground">
      {/* Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <BackgroundBeams className="w-full h-full" />
      </div>

      {/* Nội dung */}
      <main className="relative z-10 flex-1">
        <div className="container mx-auto px-4 py-12 md:py-20 max-w-7xl">
          <div className="flex flex-col items-center text-center mb-20 space-y-6">
            <div className="space-y-4">
              <div className="text-sm font-medium text-primary uppercase tracking-wider">
                My Blog
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight font-serif">
                My Stories &amp; Ideas
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl">
                The latest writings, news, technologies, and resources from me.
              </p>
            </div>

            <div className="w-full max-w-md flex gap-2 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none z-10" />
                <input
                  type="text"
                  placeholder="Search article..."
                  className="flex w-full rounded-md border border-input bg-background backdrop-blur-sm px-3 py-2 text-sm pl-10 h-10"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-16 max-w-3xl mx-auto">
            <Button variant="default" className="rounded-3xl">
              All
            </Button>
            <Button variant="outline" className="rounded-3xl">
              Frontend
            </Button>
            <Button variant="outline" className="rounded-3xl">
              Backend
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
