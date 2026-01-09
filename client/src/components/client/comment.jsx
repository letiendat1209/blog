import { Heart, Share2, MoreHorizontal, Reply, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card } from "@/components/ui/card";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi";
import { toast } from "sonner";
import { ENTITY_TYPE } from "@/constants/reaction";
import { useReaction } from "@/hooks/reactions/useReaction";
import { useDeleteComment } from "@/hooks/comments/useDeleteComment";
import { useState } from "react";

dayjs.extend(relativeTime);
dayjs.locale("vi");

const Comment = ({
  comment,
  rootCommentId,
  replyingTo,
  setReplyingTo,
  replyContents,
  setReplyContent,
  clearReplyContent,
  handleAddReply,
  isSubmitting,
  currentUser,
  depth = 0,
  allReplies = [], // ⬅️ 🆕 Nhận toàn bộ flat replies array
}) => {
  const isReplying = replyingTo?.commentId === comment.id;
  const maxDepth = 3;
  const replyValue = replyContents[comment.id] || "";
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const displayAuthor = comment.isDeleted
    ? "Người dùng đã xóa"
    : comment.author || "Ẩn danh";

  const displayAvatar = comment.isDeleted ? null : comment.avatar;

  const { data, toggleReaction, isReacting } = useReaction(
    ENTITY_TYPE.COMMENT,
    comment.id
  );
  const isReacted = data?.myReaction !== null;

  const handleUpvoteClick = () => {
    if (!currentUser) {
      toast.error("Vui lòng đăng nhập để Upvote");
      return;
    }
    toggleReaction("UPVOTE");
  };

  const handleReplyClick = () => {
    if (!currentUser) {
      toast.error("Bạn cần đăng nhập để trả lời");
      return;
    }

    if (comment.isOptimistic || comment.id?.startsWith("temp-")) {
      toast.warning("Vui lòng đợi comment được tạo xong");
      return;
    }

    if (isReplying) {
      clearReplyContent(comment.id);
      setReplyingTo(null);
    } else {
      setReplyingTo({
        commentId: comment.id,
        rootId: rootCommentId,
        replyToName: displayAuthor,
      });
    }
  };

  const { mutate: deleteComment, isPending } = useDeleteComment(comment.postId);

  const handleDeleteClick = () => {
    if (!currentUser) {
      toast.error("Vui lòng đăng nhập để xóa bình luận");
      return;
    }
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    deleteComment(comment.id);
    setShowDeleteDialog(false);
  };

  const isOwner = currentUser?.id === comment.authorId && !comment.isDeleted;

  // 🔹 Đếm replies ĐÚNG - work cho cả root comment và nested reply
  const countReplies = () => {
    // Nếu là root comment → đếm từ comment.replies
    if (!comment.parentId) {
      return comment.replies?.length || 0;
    }

    // Nếu là reply → đếm trong allReplies (flat array)
    // những comment nào có parentId trỏ về comment này
    return allReplies.filter((r) => r.parentId === comment.id).length;
  };

  const repliesCount = countReplies();
  const hasReplies = repliesCount > 0;

  return (
    <>
      <div className={`flex gap-3 ${depth > 0 ? "mt-3" : ""}`}>
        <Avatar className="w-8 h-8">
          <AvatarImage src={displayAvatar} />
          <AvatarFallback>
            {comment.isDeleted ? "?" : displayAuthor[0]}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <Card
            className={`p-3 bg-muted/50 border-0 transition ${
              isReplying ? "ring-1 ring-primary/40 bg-primary/5" : ""
            } ${comment.isOptimistic ? "opacity-60" : ""} ${
              comment.isDeleted ? "opacity-75" : ""
            }`}
          >
            <div className="flex justify-between gap-2">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`font-semibold text-sm ${
                      comment.isDeleted ? "text-muted-foreground italic" : ""
                    }`}
                  >
                    {displayAuthor}
                  </span>

                  <span className="text-xs text-muted-foreground">
                    · {dayjs(comment.createdAt).fromNow()}
                  </span>

                  {comment.isOptimistic && (
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      Đang gửi...
                    </span>
                  )}

                  {comment.isDeleted && (
                    <span className="text-xs text-muted-foreground italic">
                      (đã xóa)
                    </span>
                  )}
                </div>

                {comment.parentId && (
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {comment.parent?.isDeleted ? (
                      <>Trả lời một bình luận đã xóa</>
                    ) : comment.replyToName ? (
                      <>
                        Trả lời{" "}
                        <span className="font-medium">
                          @{comment.replyToName}
                        </span>
                      </>
                    ) : null}
                  </div>
                )}
              </div>

              {isOwner && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handleDeleteClick}
                      disabled={isPending}
                      className="text-red-500"
                    >
                      Xóa
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            <p className="text-sm mt-2 whitespace-pre-wrap">
              {comment.isDeleted ? (
                <span className="italic text-muted-foreground">
                  [Bình luận đã bị xoá]
                </span>
              ) : (
                comment.content
              )}
            </p>
          </Card>

          <div className="flex gap-1 mt-2 text-muted-foreground">
            {!comment.isDeleted && (
              <Button
                size="sm"
                variant="ghost"
                onClick={handleUpvoteClick}
                disabled={isReacting}
                className={isReacted ? "text-red-300" : ""}
              >
                <Heart className="w-4 h-4 " />
                {data?.counts?.UPVOTE ?? 0}
              </Button>
            )}

            {depth < maxDepth && !comment.isDeleted && (
              <Button
                size="sm"
                variant="ghost"
                onClick={handleReplyClick}
                disabled={
                  comment.isOptimistic || comment.id?.startsWith("temp-")
                }
                className={isReplying ? "text-primary" : ""}
              >
                <Reply className="w-4 h-4 mr-1" />
                Trả lời
              </Button>
            )}
          </div>

          {isReplying && (
            <div className="flex mt-2 gap-3 pl-4">
              <Avatar className="h-8 w-8 mt-1 shrink-0">
                <AvatarImage src={currentUser?.avatarUrl} />
                <AvatarFallback>{currentUser?.name?.[0] ?? "U"}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-2 rounded-md bg-primary/10 px-3 py-2">
                  <span className="text-xs text-primary font-medium">
                    Đang trả lời{" "}
                    <span className="font-semibold">@{displayAuthor}</span>
                  </span>

                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-5 w-5"
                    onClick={() => {
                      clearReplyContent(comment.id);
                      setReplyingTo(null);
                    }}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>

                <Textarea
                  value={replyValue}
                  onChange={(e) => setReplyContent(comment.id, e.target.value)}
                  placeholder={`Trả lời ${displayAuthor}...`}
                  disabled={isSubmitting}
                  className="resize-none"
                />

                <div className="flex justify-end gap-2 mt-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      clearReplyContent(comment.id);
                      setReplyingTo(null);
                    }}
                  >
                    Hủy
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleAddReply(comment.id)}
                    disabled={!replyValue.trim() || isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Đang gửi...
                      </>
                    ) : (
                      "Gửi"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {comment.replies?.length > 0 && (
            <div className="mt-2 pl-4 border-l space-y-3">
              {comment.replies.map((r) => (
                <Comment
                  key={r.id}
                  comment={r}
                  rootCommentId={rootCommentId}
                  replyingTo={replyingTo}
                  setReplyingTo={setReplyingTo}
                  replyContents={replyContents}
                  setReplyContent={setReplyContent}
                  clearReplyContent={clearReplyContent}
                  handleAddReply={handleAddReply}
                  isSubmitting={isSubmitting}
                  currentUser={currentUser}
                  depth={depth + 1}
                  allReplies={comment.replies} // ⬅️ 🆕 Pass flat replies xuống
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Dialog xác nhận xóa */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa bình luận</AlertDialogTitle>

            {/* 🔹 Bỏ className="space-y-2" và không nest <p> hoặc <div> */}
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa bình luận này không?
            </AlertDialogDescription>

            {/* 🔹 Tách thành AlertDialogDescription riêng */}
            {hasReplies && (
              <AlertDialogDescription className="text-amber-600 dark:text-amber-500 font-medium">
                ⚠️ Bình luận này có {repliesCount} câu trả lời. Bình luận sẽ
                được ẩn thay vì xóa hoàn toàn.
              </AlertDialogDescription>
            )}

            {!hasReplies && (
              <AlertDialogDescription className="text-muted-foreground">
                Bình luận sẽ bị xóa hoàn toàn và không thể khôi phục.
              </AlertDialogDescription>
            )}
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={isPending}
              className="bg-rose-600 hover:bg-rose-600 focus:bg-rose-600"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Đang xóa...
                </>
              ) : (
                "Xóa"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Comment;
