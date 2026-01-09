"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { MessageSquare, UserCheck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "../ui/input";
import Comment from "./comment";
import {
  useComments,
  useCreateAnyComment,
  useCreateReply,
} from "@/hooks/comments/useComment";
import { useAuth } from "@/hooks/auths/useAuth";
import { toast } from "sonner";

const CommentSection = ({ postId }) => {
  const { user } = useAuth();
  const { data, isLoading } = useComments(postId);
  const comments = useMemo(() => data?.data || [], [data?.data]);
  const [displayName, setDisplayName] = useState(() => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem("guest_display_name") || "";
  });

  const [isNameSaved, setIsNameSaved] = useState(() => {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem("guest_display_name");
  });

  const [newComment, setNewComment] = useState("");

  // 🔥 reply state chuẩn
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContents, setReplyContents] = useState({}); // { [commentId]: text }

  const createComment = useCreateAnyComment();
  const createReply = useCreateReply();

  const replyFormRef = useRef(null);

  // 🔥 Track đang submit để prevent double submit
  const isSubmittingComment = createComment.isPending;
  const isSubmittingReply = createReply.isPending;

  useEffect(() => {
    if (replyingTo && replyFormRef.current) {
      setTimeout(() => {
        replyFormRef.current.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }, 100);
    }
  }, [replyingTo]);

  const mappedComments = useMemo(() => {
    const map = (c) => ({
      id: c.id,
      postId: c.postId,
      content: c.content,
      isDeleted: c.isDeleted,
      author: c.user?.name || c.displayName || "Guest",
      authorId: c.user?.id,
      avatar: c.user?.avatarUrl,
      createdAt: c.createdAt,

      parentId: c.parentId,

      // 🔥 ADD ĐOẠN NÀY
      parent: c.parent
        ? {
            isDeleted: c.parent.isDeleted,
            author: c.parent.user?.name || "Guest",
          }
        : null,

      replyToName: c.replyToUser?.name || null,

      replies: (c.replies || []).map(map),
    });

    return comments.map(map);
  }, [comments]);

  const setReplyContent = (commentId, value) => {
    setReplyContents((prev) => ({
      ...prev,
      [commentId]: value,
    }));
  };

  const clearReplyContent = (commentId) => {
    setReplyContents((prev) => {
      const next = { ...prev };
      delete next[commentId];
      return next;
    });
  };

  const handleSaveName = () => {
    if (!displayName.trim()) return;
    localStorage.setItem("guest_display_name", displayName.trim());
    setIsNameSaved(true);
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    if (!user && !isNameSaved) return;
    if (isSubmittingComment) return; // 🔥 Prevent double submit

    const commentData = {
      postId,
      content: newComment.trim(),
      displayName: user ? undefined : displayName,
    };

    createComment.mutate(commentData, {
      onSuccess: (response) => {
        console.log("✅ Comment created:", response);
        setNewComment("");

        // 🔥 Delay nhẹ để backend kịp lưu
        setTimeout(() => {
          toast.success("Đã gửi bình luận!");
        }, 100);
      },
      onError: (err) => {
        console.error("❌ Comment error:", err);
        console.error("Details:", {
          status: err.response?.status,
          data: err.response?.data,
        });

        // 🔥 Chỉ hiện error nếu thực sự fail
        const errorMsg = err.response?.data?.message || err.message;
        toast.error(`Lỗi: ${errorMsg}`);
      },
    });
  };

  const handleAddReply = async (commentId) => {
    const content = replyContents[commentId];
    if (!content?.trim() || !replyingTo || !user) return;
    if (isSubmittingReply) return; // 🔥 Prevent double submit

    // 🔥 CRITICAL FIX: Kiểm tra ID có phải temporary không
    if (replyingTo.commentId?.startsWith("temp-")) {
      toast.error("Vui lòng đợi comment được tạo xong trước khi reply");
      return;
    }

    const replyData = {
      postId,
      commentId: replyingTo.commentId,
      content: content.trim(),
    };

    console.log("📤 Sending reply:", replyData);

    createReply.mutate(replyData, {
      onSuccess: (response) => {
        console.log("✅ Reply created:", response);

        // 🔥 Clear state trước
        clearReplyContent(commentId);
        setReplyingTo(null);

        // 🔥 Delay nhẹ để backend kịp lưu
        setTimeout(() => {
          toast.success("Đã gửi trả lời!");
        }, 100);
      },
      onError: (err) => {
        // 🔥 Log từng property riêng lẻ để tránh stringify issues
        console.group("❌ REPLY ERROR DEBUG");
        console.log("Error object:", err);
        console.log("Error name:", err.name);
        console.log("Error message:", err.message);
        console.log("Error code:", err.code);
        console.log("Has response?:", !!err.response);

        if (err.response) {
          console.log("Response status:", err.response.status);
          console.log("Response data:", err.response.data);
          console.log("Response headers:", err.response.headers);
        }

        if (err.config) {
          console.log("Request URL:", err.config.url);
          console.log("Request method:", err.config.method);
          console.log("Request data:", err.config.data);
        }

        console.log("Sent commentId:", replyData.commentId);
        console.log("Sent content:", replyData.content);
        console.groupEnd();

        // 🔥 Kiểm tra xem có phải network error không
        if (!err.response) {
          toast.error("Lỗi kết nối. Vui lòng kiểm tra mạng!");
          return;
        }

        // 🔥 Error message từ backend hoặc default
        const errorMsg =
          err.response?.data?.message || err.message || "Có lỗi xảy ra";
        toast.error(`Lỗi: ${errorMsg}`);
      },
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Thảo luận ({comments.length})
        </h2>
      </div>

      {/* New comment */}
      <div className="flex gap-3 mb-8 pb-6 border-b">
        <Avatar className="w-10 h-10">
          <AvatarImage src={user?.avatarUrl} />
          <AvatarFallback>
            {user?.name?.[0]?.toUpperCase() || "?"}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          {!user && (
            <div className="flex gap-2 mb-3">
              <Input
                value={displayName}
                onChange={(e) => {
                  setDisplayName(e.target.value);
                  setIsNameSaved(false);
                }}
                placeholder="Tên hiển thị của bạn"
              />
              <Button
                onClick={handleSaveName}
                disabled={!displayName.trim() || isNameSaved}
              >
                <UserCheck className="w-4 h-4 mr-2" />
                {isNameSaved ? "Đã lưu" : "Lưu tên"}
              </Button>
            </div>
          )}

          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            disabled={(!user && !isNameSaved) || isSubmittingComment}
            placeholder="Chia sẻ suy nghĩ của bạn..."
            onKeyDown={(e) => {
              // 🔥 Ctrl+Enter để gửi nhanh
              if (e.ctrlKey && e.key === "Enter") {
                handleAddComment();
              }
            }}
          />

          <div className="flex justify-end mt-3">
            <Button
              onClick={handleAddComment}
              disabled={
                !newComment.trim() ||
                (!user && !isNameSaved) ||
                isSubmittingComment
              }
            >
              {isSubmittingComment ? (
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

      {/* List */}
      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <div className="space-y-6">
          {mappedComments.map((comment) => (
            <div
              key={comment.id}
              ref={replyingTo?.rootId === comment.id ? replyFormRef : null}
            >
              <Comment
                comment={comment}
                rootCommentId={comment.id}
                replyingTo={replyingTo}
                setReplyingTo={setReplyingTo}
                replyContents={replyContents}
                setReplyContent={setReplyContent}
                clearReplyContent={clearReplyContent}
                handleAddReply={handleAddReply}
                isSubmitting={isSubmittingReply}
                currentUser={user}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
