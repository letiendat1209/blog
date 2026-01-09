import { LoginForm } from "@/components/login-form";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-background text-foreground relative">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <BackgroundBeams className="w-full h-screen" />
      </div>

      <main className="flex-1 relative z-10">
        <div className="container mx-auto px-4 md:py-4 max-w-4xl space-y-32">
          <LoginForm />
        </div>
      </main>
    </div>


  );
}
