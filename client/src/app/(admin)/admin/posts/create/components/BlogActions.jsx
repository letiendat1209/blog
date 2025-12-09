"use client";

import { X, Save, Eye, Clock, Trash2 } from "lucide-react";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function BlogActions({ onCancel, onSave, isSaving }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <TooltipProvider delayDuration={200}>
      <div className="relative">
        <div
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
          className="bg-background/95 backdrop-blur-sm border border-border rounded-full shadow-2xl px-3 py-2 flex items-center gap-2 transition-all duration-300"
        >
          {/* Always visible: Close */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onCancel}
                disabled={isSaving}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-accent transition-colors disabled:opacity-50"
              >
                <X size={16} />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Cancel</p>
            </TooltipContent>
          </Tooltip>

          {/* Expandable actions */}
          <div
            className={`flex items-center gap-2 overflow-hidden transition-all duration-300 ${
              isExpanded ? "max-w-xs opacity-100" : "max-w-0 opacity-0"
            }`}
          >
            <div className="w-px h-5 bg-border shrink-0" />

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  disabled={isSaving}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-accent transition-colors disabled:opacity-50 shrink-0"
                >
                  <Eye size={16} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Preview</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  disabled={isSaving}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-accent transition-colors disabled:opacity-50 shrink-0"
                >
                  <Clock size={16} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Save as draft</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  disabled={isSaving}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-500/20 text-red-400 transition-colors disabled:opacity-50 shrink-0"
                >
                  <Trash2 size={16} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete</p>
              </TooltipContent>
            </Tooltip>

            <div className="w-px h-5 bg-border shrink-0" />
          </div>

          {/* Primary action - always visible */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onSave}
                disabled={isSaving}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full transition-colors disabled:opacity-50 text-sm font-medium shrink-0"
              >
                <Save size={14} />
                {isSaving ? "..." : "Publish"}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Publish blog post</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Unsaved indicator */}
        {!isSaving && (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full animate-pulse cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Unsaved changes</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
  );
}
