import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button
        onClick={scrollToTop}
        className={`
          w-14 h-14 rounded-full flex items-center justify-center
          bg-primary text-primary-foreground shadow-lg
          transition-all duration-300
          hover:bg-primary/90
          ${
            visible
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-4 pointer-events-none"
          }
        `}
        aria-label="Back to top"
      >
        <ArrowUp size={18} />
      </button>
    </div>
  );
};
