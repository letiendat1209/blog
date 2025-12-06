"use client";
import { ThemeProvider } from "@/components/client/theme-provider";
import { AppSidebar } from "@/components/admin/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Sun, Moon, Settings, Search } from "lucide-react";
import { useTheme } from "next-themes";
import "@/app/globals.css";

export default function RootLayout({ children }) {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator
                  orientation="vertical"
                  className="mr-2 data-[orientation=vertical]:h-4"
                />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">
                        Building Your Application
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
              <div className="ms-auto flex items-center space-x-4 pr-4">
                <form className="hidden md:block">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none z-10" />
                    <input
                      type="search"
                      className="flex rounded-md border border-input bg-background backdrop-blur-sm px-3 py-2 text-sm pl-10 h-9 w-64"
                      placeholder="Search..."
                    />
                  </div>
                </form>
                <Button
                  className="rounded-3xl"
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
                <Button className="rounded-3xl" variant="ghost" size="icon">
                  <Settings />
                </Button>
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
              {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </ThemeProvider>
    </>
  );
}
