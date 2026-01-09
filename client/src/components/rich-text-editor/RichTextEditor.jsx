"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useMemo } from "react";
import MenuBar from "./menu-bar";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Youtube from "@tiptap/extension-youtube";

export default function RichTextEditor({
  content = "",
  onChange,
  placeholder = "Start writing...",
  className = "",
  editable = true,
  minHeight = "156px",
}) {
  
  const extensions = useMemo(
    () => [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
          HTMLAttributes: {
            class: "list-disc ml-5 space-y-1",
          },
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
          HTMLAttributes: {
            class: "list-decimal ml-5 space-y-1",
          },
        },
        listItem: {
          HTMLAttributes: {
            class: "leading-relaxed",
          },
        },
        blockquote: {
          HTMLAttributes: {
            class: "border-l-4 border-gray-300 pl-4 italic text-gray-700 my-4",
          },
        },
        code: {
          HTMLAttributes: {
            class:
              "bg-gray-100 text-red-600 px-1.5 py-0.5 rounded text-sm font-mono",
          },
        },
        codeBlock: {
          HTMLAttributes: {
            class:
              "bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm my-4",
          },
        },
        heading: {
          levels: [1, 2, 3, 4],
          HTMLAttributes: {
            class: "font-bold tracking-tight",
          },
        },
        paragraph: {
          HTMLAttributes: {
            class: "leading-relaxed",
          },
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
        defaultAlignment: "left",
      }),
      Highlight.configure({
        multicolor: false,
        HTMLAttributes: {
          class: "bg-yellow-200 px-1 rounded",
        },
      }),
      Superscript.configure({
        HTMLAttributes: {
          class: "text-sm",
        },
      }),
      Subscript.configure({
        HTMLAttributes: {
          class: "text-sm",
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline cursor-pointer",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "block mx-auto max-w-full h-auto rounded-lg my-4",
        },
      }),
      Youtube.configure({
        HTMLAttributes: {
          class: "mx-auto rounded-lg my-4",
        },
      }),
      TaskList.configure({
        HTMLAttributes: {
          class: "list-none ml-0 space-y-1",
        },
      }),
      TaskItem.configure({
        HTMLAttributes: {
          class: "flex items-start gap-2",
        },
        nested: true,
      }),
      Placeholder.configure({
        placeholder,
        emptyEditorClass: "is-editor-empty",
        showOnlyWhenEditable: true,
      }),
    ],
    [placeholder]
  );

  const editor = useEditor({
    extensions,
    content,
    editable,
    immediatelyRender: false,

    editorProps: {
      attributes: {
        class: `prose prose-sm max-w-none focus:outline-none min-h-[${minHeight}] border border-border rounded-lg p-4 ${className}`,
        spellcheck: "true",
        style: `min-height: ${minHeight}`,
      },
    },

    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getHTML());
      }
    },

  });

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  }, [editor]);

  // Update content when prop changes
  React.useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  // Update editable state
  React.useEffect(() => {
    if (editor) {
      editor.setEditable(editable);
    }
  }, [editable, editor]);

  if (!editor) {
    return (
      <div className="border border-border rounded-lg p-4 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {editable && <MenuBar editor={editor} />}
      <div className="relative">
        <EditorContent editor={editor} />
        <style jsx global>{`
          .ProseMirror {
            outline: none;
          }

          .ProseMirror p.is-editor-empty:first-child::before {
            content: attr(data-placeholder);
            float: left;
            color: #9ca3af;
            pointer-events: none;
            height: 0;
          }

          .ProseMirror h1 {
            font-size: 2em;
            margin-top: 0.67em;
            margin-bottom: 0.67em;
          }

          .ProseMirror h2 {
            font-size: 1.5em;
            margin-top: 0.83em;
            margin-bottom: 0.83em;
          }

          .ProseMirror h3 {
            font-size: 1.17em;
            margin-top: 1em;
            margin-bottom: 1em;
          }

          .ProseMirror h4 {
            font-size: 1em;
            margin-top: 1.33em;
            margin-bottom: 1.33em;
          }

          .ProseMirror ul,
          .ProseMirror ol {
            padding: 0 1rem;
            margin: 1rem 0;
          }

          .ProseMirror ul li,
          .ProseMirror ol li {
            margin: 0.25rem 0;
          }

          .ProseMirror ul[data-type="taskList"] {
            list-style: none;
            padding: 0;
          }

          .ProseMirror ul[data-type="taskList"] li {
            display: flex;
            align-items: flex-start;
            gap: 0.5rem;
          }

          .ProseMirror ul[data-type="taskList"] li > label {
            flex: 0 0 auto;
            margin-right: 0.5rem;
            user-select: none;
          }

          .ProseMirror ul[data-type="taskList"] li > div {
            flex: 1 1 auto;
          }

          .ProseMirror code {
            background-color: rgba(97, 97, 97, 0.1);
            border-radius: 0.25rem;
            box-decoration-break: clone;
            color: #d63369;
            font-size: 0.9em;
            padding: 0.25em 0.3em;
          }

          .ProseMirror pre {
            background: #0d0d0d;
            border-radius: 0.5rem;
            color: #fff;
            font-family: "JetBrainsMono", monospace;
            margin: 1.5rem 0;
            padding: 0.75rem 1rem;
          }

          .ProseMirror pre code {
            background: none;
            color: inherit;
            font-size: 0.8rem;
            padding: 0;
          }

          .ProseMirror blockquote {
            border-left: 3px solid #d1d5db;
            margin: 1.5rem 0;
            padding-left: 1rem;
          }

          .ProseMirror hr {
            border: none;
            border-top: 2px solid #e5e7eb;
            margin: 2rem 0;
          }

          .ProseMirror img {
            max-width: 100%;
            height: auto;
            border-radius: 0.5rem;
            margin: 1rem 0;
          }

          /* Selection styling */
          .ProseMirror ::selection {
            background-color: #accef7;
          }

          .ProseMirror:focus-visible {
            outline: none;
          }
        `}</style>
      </div>
    </div>
  );
}
