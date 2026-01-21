"use client";
import { useState, useEffect } from "react";
import { Menu, X, Search, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useAuth } from "@/hooks/auths/useAuth";
import { logout } from "@/services/auth.service";
import Image from "next/image";
import { AuthSkeleton } from "./AuthSkeleton";
import { toast } from "sonner";

// Config
const MENU_LINKS = [
  // { href: "/project", label: "Project" },
  { href: "/blogs", label: "Blogs" },
  { href: "/photo", label: "Photo" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const MESSAGES = {
  LOGOUT_ERROR: "Đăng xuất thất bại. Vui lòng thử lại.",
  LOGOUT_SUCCESS: "Đăng xuất thành công!",
};

export const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSkeleton, setShowSkeleton] = useState(false);
  const router = useRouter();

  const { user, loading, mutate } = useAuth();

  // Handle theme hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Delay skeleton to avoid flash
  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => setShowSkeleton(true), 200);
      return () => clearTimeout(timer);
    }
    setShowSkeleton(false);
  }, [loading]);

  // Close mobile menu on outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      const target = e.target;
      if (!target.closest("nav")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);

      // Optimistic update
      mutate(null, false);

      // Call logout API
      await logout();

      toast.success(MESSAGES.LOGOUT_SUCCESS);
    } catch (error) {
      // Revalidate on error
      mutate();
      toast.error(MESSAGES.LOGOUT_ERROR);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const handleAvatarError = (e) => {
    e.currentTarget.src = "/default-avatar.png";
  };

  return (
    <nav className="border-b border-border bg-background backdrop-blur-3xl sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* LEFT */}
        <div className="flex items-center gap-8">
          <Link
            className="font-mono text-lg font-bold flex items-center gap-1 hover:opacity-80 transition-opacity"
            href="/"
            aria-label="Home"
          >
            <span className="text-primary">&gt;</span>
            <span className="text-foreground min-w-[100px]">dev.owl</span>
            <span className="text-primary animate-pulse">_</span>
          </Link>

          <div className="hidden md:flex items-center gap-6" role="navigation">
            {MENU_LINKS.map((link) => (
              <Link
                key={link.href}
                className="text-sm font-medium hover:text-primary transition-colors"
                href={link.href}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-1 md:gap-4">
          <form
            className="hidden md:block"
            onSubmit={handleSearch}
            role="search"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none z-10" />
              <Input
                className="flex rounded-md border border-input bg-background backdrop-blur-sm px-3 py-2 text-sm pl-10 h-9 w-64"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search"
              />
            </div>
          </form>

          {loading && showSkeleton ? (
            <AuthSkeleton />
          ) : user ? (
            <div className="flex items-center gap-3">
              <Image
                src={user.avatarUrl}
                alt={user.name}
                width={32}
                height={32}
                className="rounded-full border border-border"
                onError={handleAvatarError}
              />

              <span className="hidden sm:inline text-sm font-medium">
                {user.name}
              </span>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                disabled={isLoggingOut}
                aria-label="Logout"
              >
                {isLoggingOut ? "Logging out..." : "Logout"}
              </Button>
            </div>
          ) : (
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
          )}

          <Button
            className="rounded-3xl hover:bg-accent text-muted-foreground transition-all duration-300 cursor-pointer group"
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label={`Switch to ${
              theme === "light" ? "dark" : "light"
            } mode`}
          >
            {!mounted ? (
              <div className="w-5 h-5" />
            ) : theme === "light" ? (
              <Moon className="text-slate-700 transition-all duration-300 group-hover:rotate-[-15deg] group-hover:scale-110 group-hover:text-blue-500" />
            ) : (
              <Sun className="text-yellow-400 transition-all duration-300 group-hover:rotate-90 group-hover:scale-110 group-hover:text-yellow-300" />
            )}
          </Button>

          {/* Toggle menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-accent rounded-full text-muted-foreground transition-colors"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div
          id="mobile-menu"
          role="navigation"
          aria-label="Mobile navigation"
          className="md:hidden absolute top-16 left-0 w-full bg-background border-b border-border p-4 flex flex-col gap-4 shadow-lg animate-in slide-in-from-top-5"
        >
          {MENU_LINKS.map((link) => (
            <Link
              key={link.href}
              className="text-sm font-medium hover:text-primary transition-colors"
              href={link.href}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};
