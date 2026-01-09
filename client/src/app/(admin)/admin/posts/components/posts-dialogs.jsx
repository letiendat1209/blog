import { ConfirmDialog } from "@/components/confirm-dialog";
import { usePostsUI } from "./posts-provider";
import { toast } from "sonner";
// import { useDeletePost } from "@/hooks/posts/usePost"; // nếu có

export function PostsDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = usePostsUI();
  // const { deletePostAsync } = useDeletePost();

  const handleClose = () => {
    setOpen(null);
    setTimeout(() => {
      setCurrentRow(null);
    }, 300);
  };

  const handleDelete = async () => {
    try {
      // await deletePostAsync(currentRow.id);

      toast.success("Xóa bài viết thành công 🗑️");
      handleClose();
    } catch (err) {
      console.error(err);
      toast.error("Xóa bài viết thất bại 💀");
    }
  };

  if (!currentRow) return null;

  return (
    <ConfirmDialog
      destructive
      open={open === "delete"}
      onOpenChange={(isOpen) => {
        if (!isOpen) handleClose();
      }}
      handleConfirm={handleDelete}
      className="max-w-md"
      title={`Delete this post: ${currentRow.id}?`}
      desc={
        <>
          You are about to delete a post with ID{" "}
          <strong>{currentRow.id}</strong>.
          <br />
          This action cannot be undone.
        </>
      }
      confirmText="Delete"
    />
  );
}
