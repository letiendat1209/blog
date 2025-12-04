import { ArrowUp } from "lucide-react";

export const BackToTop = () => {
  return (
    <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-50 items-end">
      <button className="backdrop-blur-sm gap-2 whitespace-nowrap text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive px-4 py-2 has-[>svg]:px-3 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:bg-primary/90 transition-all duration-300 transform opacity-100 translate-y-0">
        <ArrowUp size={16} />
      </button>
    </div>
  );
};
