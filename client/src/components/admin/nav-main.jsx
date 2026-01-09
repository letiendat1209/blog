"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "../ui/button";

export function NavMain({ items }) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menu</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              {/* ---- ITEM CHÍNH: NAY SẼ CLICK ĐƯỢC ---- */}
              <div className="flex items-center">
                <SidebarMenuButton asChild>
                  <Link
                    href={item.url}
                    className="flex items-center gap-2 flex-1"
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>

                {/* CHỈ HIỆN KHI KHÔNG COLLAPSED VÀ CÓ SUB ITEMS */}
                {!isCollapsed && item.items?.length > 0 && (
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="ml-1">
                      <ChevronRight
                        size={16}
                        className="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                      />
                    </Button>
                  </CollapsibleTrigger>
                )}
              </div>

              {/* ---- SUB MENU ---- */}
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <Link href={subItem.url}>
                          <span>{subItem.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
