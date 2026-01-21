"use client";

import { X, Save, Eye, Upload, Archive } from "lucide-react";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function BlogActions({
  onCancel,
  onSaveDraft, // update / save
  onPublish,
  onArchive,
  isSaving,
  status, // "DRAFT" | "PUBLISHED" | "ARCHIVED" (hiện chỉ dùng để hiển thị)
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <TooltipProvider delayDuration={200}>
      <div className="relative">
        <div
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
          className="bg-background/95 backdrop-blur-sm border border-border rounded-full shadow-2xl px-3 py-2 flex items-center gap-2 transition-all"
        >
          {/* Cancel */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onCancel}
                disabled={isSaving}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-accent disabled:opacity-50"
              >
                <X size={16} />
              </button>
            </TooltipTrigger>
            <TooltipContent>Cancel</TooltipContent>
          </Tooltip>

          {/* Expandable actions */}
          <div
            className={`flex items-center gap-2 overflow-hidden transition-all duration-300 ${
              isExpanded ? "max-w-xs opacity-100" : "max-w-0 opacity-0"
            }`}
          >
            <div className="w-px h-5 bg-border shrink-0" />

            {/* Preview (optional – chưa hook logic) */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  disabled={isSaving}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-accent shrink-0"
                >
                  <Eye size={16} />
                </button>
              </TooltipTrigger>
              <TooltipContent>Preview</TooltipContent>
            </Tooltip>

            {/* Save */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={onSaveDraft}
                  disabled={isSaving}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-accent shrink-0"
                >
                  <Save size={16} />
                </button>
              </TooltipTrigger>
              <TooltipContent>Save</TooltipContent>
            </Tooltip>

            {/* Publish */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={onPublish}
                  disabled={isSaving}
                  className="w-8 h-8 flex items-center justify-center rounded-full
                             hover:bg-emerald-500/20 text-emerald-500 shrink-0"
                >
                  <Upload size={16} />
                </button>
              </TooltipTrigger>
              <TooltipContent>Publish</TooltipContent>
            </Tooltip>

            {/* Archive */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={onArchive}
                  disabled={isSaving}
                  className="w-8 h-8 flex items-center justify-center rounded-full
                             hover:bg-yellow-500/20 text-yellow-500 shrink-0"
                >
                  <Archive size={16} />
                </button>
              </TooltipTrigger>
              <TooltipContent>Archive</TooltipContent>
            </Tooltip>

            <div className="w-px h-5 bg-border shrink-0" />
          </div>

          {/* Primary button = Save */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onSaveDraft}
                disabled={isSaving}
                className="flex items-center gap-1.5 px-3 py-1.5
                           bg-emerald-500 hover:bg-emerald-600
                           text-white rounded-full text-sm font-medium shrink-0
                           disabled:opacity-50"
              >
                <Save size={14} />
                {isSaving ? "..." : "Save"}
              </button>
            </TooltipTrigger>
            <TooltipContent>Save changes</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}
