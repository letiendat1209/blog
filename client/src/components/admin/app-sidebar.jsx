"use client";

import * as React from "react";
import { NavMain } from "@/components/admin/nav-main";
import { NavUser } from "@/components/admin/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { UserStar, Loader2 } from "lucide-react";
import { SidebarItems } from "@/config/sidebar";
import { useAuth } from "@/hooks/auths/useAuth";

export function AppSidebar({ ...props }) {
  const { user, loading } = useAuth();

  // Merge user data vào sidebar config
  const sidebarData = React.useMemo(() => {
    if (!user) return SidebarItems;

    return {
      ...SidebarItems,
      user: {
        name: user.name,
        email: user.email,
        avatar: user.avatarUrl,
        role: user.role,
      },
    };
  }, [user]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg overflow-hidden">
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : user?.avatarUrl ? (
                  <Image
                    width={32}
                    height={32}
                    src={user.avatarUrl}
                    alt={user.name || "User avatar"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <UserStar className="size-4" />
                )}
              </div>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {loading ? "Loading..." : user?.name || "Guest"}
                </span>
                <span className="truncate text-xs">
                  {loading ? "..." : user?.role?.toLowerCase() || "user"}
                </span>
              </div>

              {user?.role === "ADMIN" && (
                <UserStar className="ml-auto size-4 text-yellow-500" />
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={sidebarData.navMain} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={sidebarData.user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
