import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="absolute top-0 left-0 w-full h-screen overflow-hidden z-0">
        {/* <BackgroundBeams className="w-full h-full" /> */}
      </div>
      <div className="absolute inset-0 z-5 pointer-events-none" />
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Oops! Trang này không tồn tại.</p>
      <Button variant="outline">Back to home</Button>
    </div>
  );
}
