"use client";
import { useState } from "react";
import { Menu, X, Search, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Button } from "../ui/button";
import { Settings } from "lucide-react";
import { Input } from "../ui/input";

const menuLinks = ["project", "blogs", "photo", "about", "contact"];
export const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b border-border bg-background backdrop-blur-3xl sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* LEFT */}
        <div className="flex items-center gap-8">
          <Link
            className="font-mono text-lg font-bold flex items-center gap-1 hover:opacity-80 transition-opacity"
            href="/"
          >
            <span className="text-primary">&gt;</span>
            <span className="text-foreground min-w-[100px]">dev.ltd</span>
            <span className="text-primary animate-pulse">_</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {menuLinks.map((link) => (
              <Link
                key={link}
                className="text-sm font-medium hover:text-primary transition-colors"
                href={`/${link}`}
              >
                {link.charAt(0).toUpperCase() + link.slice(1)}
              </Link>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-1 md:gap-4">
          <form className="hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none z-10" />
              <Input
                className="flex rounded-md border border-input bg-background backdrop-blur-sm px-3 py-2 text-sm pl-10 h-9 w-64"
                placeholder="Search..."
              />
            </div>
          </form>

          <Button variant="ghost">
            <Link href="/login">Login</Link>
          </Button>

          <Button
            className="rounded-3xl hover:bg-accent text-muted-foreground transition-all duration-300 cursor-pointer group"
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? (
              <Moon className="text-slate-700 transition-all duration-300 group-hover:rotate-[-15deg] group-hover:scale-110 group-hover:text-blue-500" />
            ) : (
              <Sun className="text-yellow-400 transition-all duration-300 group-hover:rotate-90 group-hover:scale-110 group-hover:text-yellow-300" />
            )}
          </Button>

          {/* Toggle menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-accent rounded-full text-muted-foreground transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-background border-b border-border p-4 flex flex-col gap-4 shadow-lg animate-in slide-in-from-top-5">
          {menuLinks.map((link) => (
            <Link
              key={link}
              className="text-sm font-medium hover:text-primary transition-colors"
              href={`/${link}`}
            >
              {link.charAt(0).toUpperCase() + link.slice(1)}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};
