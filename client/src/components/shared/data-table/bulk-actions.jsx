"use client";
import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/utils/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/**
 * DataTableBulkActions - JS version (no TypeScript generics)
 *
 * Props:
 *  - table: react-table instance
 *  - entityName: string
 *  - children: React nodes (action buttons)
 */
export function DataTableBulkActions({ table, entityName = "item", children }) {
  const selectedRows = table.getFilteredSelectedRowModel().rows;
  const selectedCount = selectedRows.length;

  // useRef without TS generic to avoid "HTMLDivElement is not defined"
  const toolbarRef = useRef(null);
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    if (selectedCount > 0) {
      const message = `${selectedCount} ${entityName}${
        selectedCount > 1 ? "s" : ""
      } selected. Bulk actions toolbar is available.`;

      // Defer update
      if (typeof queueMicrotask === "function") {
        queueMicrotask(() => setAnnouncement(message));
      } else {
        setTimeout(() => setAnnouncement(message), 0);
      }

      const timer = setTimeout(() => setAnnouncement(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [selectedCount, entityName]);

  const handleClearSelection = () => {
    // react-table v8 uses table.resetRowSelection()
    if (typeof table.resetRowSelection === "function") {
      table.resetRowSelection();
    } else if (typeof table.resetSelection === "function") {
      table.resetSelection();
    }
  };

  const handleKeyDown = (event) => {
    const buttons = toolbarRef.current?.querySelectorAll("button");
    if (!buttons || buttons.length === 0) return;

    const currentIndex = Array.from(buttons).findIndex(
      (button) => button === document.activeElement
    );

    switch (event.key) {
      case "ArrowRight": {
        event.preventDefault();
        const nextIndex = (currentIndex + 1) % buttons.length;
        buttons[nextIndex]?.focus();
        break;
      }
      case "ArrowLeft": {
        event.preventDefault();
        const prevIndex =
          currentIndex <= 0 ? buttons.length - 1 : currentIndex - 1;
        buttons[prevIndex]?.focus();
        break;
      }
      case "Home":
        event.preventDefault();
        buttons[0]?.focus();
        break;
      case "End":
        event.preventDefault();
        buttons[buttons.length - 1]?.focus();
        break;
      case "Escape": {
        // check if Escape came from a dropdown trigger/content (Radix portaled)
        const target = event.target;
        const activeElement = document.activeElement;

        const isFromDropdownTrigger =
          target?.getAttribute?.("data-slot") === "dropdown-menu-trigger" ||
          activeElement?.getAttribute?.("data-slot") ===
            "dropdown-menu-trigger" ||
          !!target?.closest?.('[data-slot="dropdown-menu-trigger"]') ||
          !!activeElement?.closest?.('[data-slot="dropdown-menu-trigger"]');

        const isFromDropdownContent =
          !!activeElement?.closest?.('[data-slot="dropdown-menu-content"]') ||
          !!target?.closest?.('[data-slot="dropdown-menu-content"]');

        if (isFromDropdownTrigger || isFromDropdownContent) {
          // Escape meant for dropdown
          return;
        }

        event.preventDefault();
        handleClearSelection();
        break;
      }
      default:
        break;
    }
  };

  if (selectedCount === 0) return null;

  return (
    <>
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        role="status"
      >
        {announcement}
      </div>

      <div
        ref={toolbarRef}
        role="toolbar"
        aria-label={`Bulk actions for ${selectedCount} selected ${entityName}${
          selectedCount > 1 ? "s" : ""
        }`}
        aria-describedby="bulk-actions-description"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        className={cn(
          "fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl",
          "transition-all delay-100 duration-300 ease-out hover:scale-105",
          "focus-visible:ring-ring/50 focus-visible:ring-2 focus-visible:outline-none"
        )}
      >
        <div
          className={cn(
            "p-2 shadow-xl",
            "rounded-xl border",
            "bg-background/95 supports-backdrop-filter:bg-background/60 backdrop-blur-lg",
            "flex items-center gap-x-2"
          )}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={handleClearSelection}
                className="size-6 rounded-full"
                aria-label="Clear selection"
                title="Clear selection (Escape)"
              >
                <X />
                <span className="sr-only">Clear selection</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Clear selection (Escape)</p>
            </TooltipContent>
          </Tooltip>

          <Separator
            className="h-5"
            orientation="vertical"
            aria-hidden="true"
          />

          <div
            className="flex items-center gap-x-1 text-sm"
            id="bulk-actions-description"
          >
            <Badge
              variant="default"
              className="min-w-8 rounded-lg"
              aria-label={`${selectedCount} selected`}
            >
              {selectedCount}
            </Badge>{" "}
            <span className="hidden sm:inline">
              {entityName}
              {selectedCount > 1 ? "s" : ""}
            </span>{" "}
            selected
          </div>

          <Separator
            className="h-5"
            orientation="vertical"
            aria-hidden="true"
          />

          {children}
        </div>
      </div>
    </>
  );
}
