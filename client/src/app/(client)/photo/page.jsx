import { BackgroundBeams } from "@/components/ui/background-beams";

export default function PhotoPage() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-background text-foreground relative">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <BackgroundBeams className="w-full h-screen" />
      </div>
      <main className="flex-1 relative z-10">
        <div className="container mx-auto px-4 md:py-4 max-w-4xl space-y-32">
          <div className="space-y-20">
            {/* Header */}
            <section className="text-center space-y-4 pt-24">
              <h1 className="text-4xl md:text-5xl font-bold">Photos</h1>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Một góc nhỏ lưu lại mấy khoảnh khắc mình thấy ổn. Không filter
                quá tay, không chỉnh màu gắt, chỉ là những thứ mình thích.
              </p>
            </section>

            {/* Photo Grid */}
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="group relative overflow-hidden rounded-xl border bg-card"
                >
                  <div className="aspect-square bg-muted" />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                    <div className="p-3 text-sm text-white">Photo #{item}</div>
                  </div>
                </div>
              ))}
            </section>

            {/* Footer text */}
            <section className="text-center text-sm text-muted-foreground">
              Ảnh được chụp linh tinh trong lúc rảnh, không phải nhiếp ảnh gia,
              chỉ là người thích lưu lại cảm giác.
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}