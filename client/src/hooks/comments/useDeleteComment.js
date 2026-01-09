import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment } from "@/services/comment.service";

export const useDeleteComment = (postId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteComment,

    onSuccess: (data) => {
      const { deleteType, comment, commentId } = data;

      // 🔹 Cập nhật cache
      queryClient.setQueryData(["comments", "POST", postId], (oldData) => {
        if (!oldData) return oldData;

        // ✅ Handle Infinite Query structure
        if (oldData.pages) {
          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              data: updateCommentsArray(
                page.data,
                deleteType,
                commentId,
                comment
              ),
            })),
          };
        }

        // ✅ Handle simple array structure
        return updateCommentsArray(oldData, deleteType, commentId, comment);
      });

      // ♻️ Refetch để sync (optional - có thể bỏ nếu cache update đủ tốt)
      queryClient.invalidateQueries({
        queryKey: ["comments", "POST", postId],
      });
    },

    // ❌ Không toast ở đây - để component tự quyết định
    // Component biết context rõ hơn (có bao nhiêu replies, message gì phù hợp)
  });
};

// 🔧 Helper function để update comments array
function updateCommentsArray(comments, deleteType, commentId, updatedComment) {
  if (!Array.isArray(comments)) return comments;

  return comments
    .map((rootComment) => {
      // 🔴 HARD DELETE
      if (deleteType === "hard") {
        // Root comment bị xóa
        if (rootComment.id === commentId) {
          return null; // Xóa khỏi array
        }

        // Reply bị xóa
        if (rootComment.replies?.length > 0) {
          return {
            ...rootComment,
            replies: rootComment.replies.filter((r) => r.id !== commentId),
          };
        }
      }

      // 🟡 SOFT DELETE
      if (deleteType === "soft") {
        // Root comment bị soft delete
        if (rootComment.id === commentId) {
          return {
            ...updatedComment,
            replies: rootComment.replies || [], // Giữ nguyên replies
          };
        }

        // Reply bị soft delete
        if (rootComment.replies?.length > 0) {
          return {
            ...rootComment,
            replies: rootComment.replies.map((r) =>
              r.id === commentId ? updatedComment : r
            ),
          };
        }
      }

      return rootComment;
    })
    .filter(Boolean); // Loại bỏ null (hard deleted items)
}
