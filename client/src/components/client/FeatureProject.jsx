import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const FeaturedProject = () => {
  
  return (
    <>
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
                Aperiam vel veritatis dolor id dolore voluptate illum quaerat
                veniam! Amet beatae suscipit, unde reprehenderit nemo itaque rem
                recusandae fugit cumque odit!
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
              alt="project"
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
    </>
  );
};
