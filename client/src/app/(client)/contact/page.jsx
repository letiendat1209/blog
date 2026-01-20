import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-background text-foreground relative">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <BackgroundBeams className="w-full h-screen" />
      </div>
      <main className="flex-1 relative z-10">
        <div className="container mx-auto px-4 md:py-4 max-w-4xl space-y-32">
          <div className="space-y-16">
            {/* Header */}
            <section className="text-center space-y-4 pt-24">
              <h1 className="text-4xl md:text-5xl font-bold">Contact</h1>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Có idea hay, dự án thú vị, hay đơn giản là muốn nói chuyện về
                code, cứ ping mình. Mình luôn mở cửa cho mấy cuộc trò chuyện hehe.
              </p>
            </section>

            {/* Content */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left: Info */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Thông tin liên hệ
                  </h3>
                  <p className="text-muted-foreground">
                    Prefer nói chuyện rõ ràng, ngắn gọn, không vòng vo tam quốc.
                  </p>
                </div>

                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium">Email:</span>{" "}
                    <a
                      href="mailto:letiendat1209@email.com"
                      className="text-primary hover:underline"
                    >
                      letiendat1209@email.com
                    </a>
                  </div>

                  <div>
                    <span className="font-medium">GitHub:</span>{" "}
                    <a
                      href="https://github.com/letiendat1209"
                      target="_blank"
                      className="text-primary hover:underline"
                    >
                      github.com/letiendat1209
                    </a>
                  </div>

                  <div>
                    <span className="font-medium">LinkedIn:</span>{" "}
                    <a
                      href="https://www.linkedin.com/in/ltd1209/"
                      target="_blank"
                      className="text-primary hover:underline"
                    >
                      linkedin.com/in/ltd1209/
                    </a>
                  </div>
                </div>
              </div>

              {/* Right: Form */}
              <div className="bg-card border rounded-xl p-6 space-y-4">
                <h3 className="text-xl font-semibold">Gửi lời nhắn</h3>

                <form className="space-y-4">
                  <Input
                    type="text"
                    placeholder="Tên của bạn"
                    className="w-full px-4 py-2 rounded-md bg-background border focus:outline-none focus:ring-2 focus:ring-primary"
                  />

                  <Input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 rounded-md bg-background border focus:outline-none focus:ring-2 focus:ring-primary"
                  />

                  <Textarea
                    placeholder="Nội dung bạn muốn nói..."
                    rows={4}
                    className="w-full px-4 py-2 rounded-md bg-background border focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />

                  <Button
                    variant="default"
                    type="submit"
                    className="w-full"
                  >
                    Gửi
                  </Button>
                </form>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
