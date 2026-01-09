import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Heading,
  Highlighter,
  Italic,
  Link,
  List,
  ListOrdered,
  Quote,
  Redo,
  Strikethrough,
  Subscript,
  Superscript,
  Underline,
  Undo,
  Image,
  ChevronDown,
  CheckSquare,
  Code2,
  Play,
} from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useCallback } from "react"; // ✅ Thêm import useCallback
import { Divider } from "../ui/divider";
import { addYoutubeWithSonner } from "./youtube-dialog";
import { toast } from "sonner";
import { useUploadImage } from "@/hooks/uploads/useUpload";
import { Loader2 } from "lucide-react";
import { ImageIcon } from "lucide-react";

export default function MenuBar({ editor }) {
  
  const { uploadImage, isLoading } = useUploadImage();

  const handleImageUpload = useCallback(() => {
    if (isLoading) return;

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (file.size > 5 * 1024 * 1024) {
        toast("Ảnh không được vượt quá 5MB");
        return;
      }

      if (!file.type.startsWith("image/")) {
        toast("Vui lòng chọn file ảnh hợp lệ");
        return;
      }

      try {
        const toastId = toast.loading("Đang upload ảnh...");

        const imageUrl = await uploadImage(file);

        toast.dismiss(toastId);

        editor.chain().focus().setImage({ src: imageUrl }).run();
      } catch (err) {
        toast.dismiss();
        console.error(err);
        toast("Có lỗi khi upload ảnh");
      }

    };

    input.click();
  }, [editor, uploadImage, isLoading]);


  const handleAddYoutube = useCallback(() => {
    if (!editor) return;
    addYoutubeWithSonner(editor);
  }, [editor]);

  // Handle link
  const handleSetLink = useCallback(() => {
    if (!editor) return;
    const url = window.prompt("Enter URL:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  }, [editor]);

  // ✅ Early return SAU khi đã khai báo tất cả hooks
  if (!editor) {
    return null;
  }

  // Render Undo/Redo group
  const renderUndoRedo = () => (
    <>
      <Toggle
        pressed={false}
        onPressedChange={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className="h-8 w-8 p-0"
        title="Undo"
      >
        <Undo className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={false}
        onPressedChange={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className="h-8 w-8 p-0"
        title="Redo"
      >
        <Redo className="h-4 w-4" />
      </Toggle>
    </>
  );

  // Render Heading dropdown
  const renderHeadingDropdown = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 px-2 gap-1">
          <Heading className="h-4 w-4" />
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          <Heading className="h-4 w-4 mr-2" />
          Heading 1
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <Heading className="h-4 w-4 mr-2" />
          Heading 2
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          <Heading className="h-4 w-4 mr-2" />
          Heading 3
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
        >
          <Heading className="h-4 w-4 mr-2" />
          Heading 4
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  // Render List dropdown
  const renderListDropdown = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 gap-1"
          data-state={
            editor.isActive("bulletList") ||
            editor.isActive("orderedList") ||
            editor.isActive("taskList")
              ? "on"
              : "off"
          }
        >
          <List className="h-4 w-4" />
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className="h-4 w-4 mr-2" />
          Bullet List
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="h-4 w-4 mr-2" />
          Ordered List
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => editor.chain().focus().toggleTaskList().run()}
        >
          <CheckSquare className="h-4 w-4 mr-2" />
          Task List
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  // Render Blockquote & Codeblock
  const renderBlockElements = () => (
    <>
      <Toggle
        pressed={editor.isActive("blockquote")}
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
        className="h-8 w-8 p-0"
        title="Blockquote"
      >
        <Quote className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={editor.isActive("codeBlock")}
        onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
        className="h-8 w-8 p-0"
        title="Code Block"
      >
        <Code2 className="h-4 w-4" />
      </Toggle>
    </>
  );

  // Render Text Formatting
  const renderTextFormatting = () => (
    <>
      <Toggle
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className="h-8 w-8 p-0"
        title="Bold"
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className="h-8 w-8 p-0"
        title="Italic"
      >
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={editor.isActive("strike")}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className="h-8 w-8 p-0"
        title="Strikethrough"
      >
        <Strikethrough className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={editor.isActive("code")}
        onPressedChange={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className="h-8 w-8 p-0"
        title="Code"
      >
        <Code className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={editor.isActive("underline")}
        onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
        className="h-8 w-8 p-0"
        title="Underline"
      >
        <Underline className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={editor.isActive("highlight")}
        onPressedChange={() => editor.chain().focus().toggleHighlight().run()}
        className="h-8 w-8 p-0"
        title="Highlight"
      >
        <Highlighter className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={editor.isActive("link")}
        onPressedChange={handleSetLink}
        className="h-8 w-8 p-0"
        title="Link"
      >
        <Link className="h-4 w-4" />
      </Toggle>
    </>
  );

  // Render Superscript & Subscript
  const renderScriptButtons = () => (
    <>
      <Toggle
        pressed={editor.isActive("superscript")}
        onPressedChange={() => editor.chain().focus().toggleSuperscript().run()}
        className="h-8 w-8 p-0"
        title="Superscript"
      >
        <Superscript className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={editor.isActive("subscript")}
        onPressedChange={() => editor.chain().focus().toggleSubscript().run()}
        className="h-8 w-8 p-0"
        title="Subscript"
      >
        <Subscript className="h-4 w-4" />
      </Toggle>
    </>
  );

  // Render Alignment
  const renderAlignment = () => (
    <>
      <Toggle
        pressed={editor.isActive({ textAlign: "left" })}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign("left").run()
        }
        className="h-8 w-8 p-0"
        title="Align Left"
      >
        <AlignLeft className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={editor.isActive({ textAlign: "center" })}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign("center").run()
        }
        className="h-8 w-8 p-0"
        title="Align Center"
      >
        <AlignCenter className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={editor.isActive({ textAlign: "right" })}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign("right").run()
        }
        className="h-8 w-8 p-0"
        title="Align Right"
      >
        <AlignRight className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={editor.isActive({ textAlign: "justify" })}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign("justify").run()
        }
        className="h-8 w-8 p-0"
        title="Align Justify"
      >
        <AlignJustify className="h-4 w-4" />
      </Toggle>
    </>
  );

  return (
    <div className="border rounded-2xl border-border px-3 py-2 flex mb-2 items-center gap-1">
      {renderUndoRedo()}
      <Divider />
      {renderHeadingDropdown()}
      {renderListDropdown()}
      {renderBlockElements()}
      <Divider />
      {renderTextFormatting()}
      <Divider />
      {renderScriptButtons()}
      <Divider />
      {renderAlignment()}
      <Divider />
      <Toggle
        pressed={false}
        onPressedChange={handleImageUpload}
        disabled={isLoading}
        className="h-8 w-8 p-0"
        title="Add Image"
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <ImageIcon className="h-4 w-4" />
        )}
      </Toggle>

      <Toggle
        pressed={false}
        onPressedChange={handleAddYoutube}
        className="h-8 w-8 p-0"
        title="Add YouTube Video"
      >
        <Play className="h-4 w-4" />
      </Toggle>
    </div>
  );
}
