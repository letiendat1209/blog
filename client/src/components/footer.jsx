import { Facebook, Instagram, Linkedin, Github, Mail } from "lucide-react";
import Link from "next/link";
export const Footer = () => {
  return (
    <footer className="bg-background border-t border-border pt-16 pb-8 w-full relative z-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          <div className="lg:w-1/2 flex flex-col justify-between">
            <Link
              className="font-mono text-2xl font-bold flex items-center gap-1 mb-4 hover:opacity-80 transition-opacity"
              href="/"
            >
              <span className="text-primary">&gt;</span>
              <span className="text-foreground">letiendat</span>
              <span className="text-primary animate-pulse">_</span>
            </Link>
            <div className="text-muted-foreground mb-6 max-w-sm whitespace-pre-wrap">
              Full Stack Developer building beautiful web experiences. Sharing
              knowledge and journey through code.
            </div>
            <div className="flex gap-4 mt-auto">
              <Link
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#F6E8D2] flex items-center justify-center text-[#42475B] hover:bg-primary hover:text-white transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </Link>
              <Link
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#F6E8D2] flex items-center justify-center text-[#42475B] hover:bg-primary hover:text-white transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </Link>
              <Link
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#F6E8D2] flex items-center justify-center text-[#42475B] hover:bg-primary hover:text-white transition-all duration-300"
                aria-label="Github"
              >
                <Github size={16} />
              </Link>
              <Link
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#F6E8D2] flex items-center justify-center text-[#42475B] hover:bg-primary hover:text-white transition-all duration-300"
                aria-label="Linkedin"
              >
                <Linkedin size={16} />
              </Link>
              <Link
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#F6E8D2] flex items-center justify-center text-[#42475B] hover:bg-primary hover:text-white transition-all duration-300"
                aria-label="Email"
              >
                <Mail size={16} />
              </Link>
            </div>
          </div>
          <div className="hidden lg:block w-px bg-border mx-4 h-auto min-h-full"></div>
          <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-foreground mb-4">Explore</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    className="text-muted-foreground hover:text-primary transition-colors"
                    href="/project"
                  >
                    Project
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-muted-foreground hover:text-primary transition-colors"
                    href="/blog"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-muted-foreground hover:text-primary transition-colors"
                    href="/photo"
                  >
                    Photo
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-muted-foreground hover:text-primary transition-colors"
                    href="/about"
                  >
                    About Me
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-muted-foreground hover:text-primary transition-colors"
                    href="/showcase"
                  >
                    Showcase
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Connect</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    className="text-muted-foreground hover:text-primary transition-colors"
                    href="/contact"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-muted-foreground hover:text-primary transition-colors"
                    href="/resume"
                  >
                    Resume
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-muted-foreground hover:text-primary transition-colors"
                    href="/"
                  >
                    Email Me
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2025 Le Tien Dat. All rights reserved.</p>
          <div className="flex gap-6">
            <a className="hover:text-primary transition-colors" href="/privacy">
              Privacy Policy
            </a>
            <a className="hover:text-primary transition-colors" href="/terms">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
