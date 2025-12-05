"use client";
import React, { useState } from "react";
import {
  MessageSquare,
  Image,
  Smile,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Comment from "./comment";

const CommentSection = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Nguyễn Văn A",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
      time: "2 giờ trước",
      content:
        "Bài viết rất hay và bổ ích! Mình đã áp dụng những tips này vào dự án thực tế và thấy hiệu quả rõ rệt.",
      likes: 12,
      isLiked: false,
      replies: [
        {
          id: 11,
          author: "Trần Thị B",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
          time: "1 giờ trước",
          content: "Đồng ý! Bạn có thể chia sẻ thêm về cách áp dụng không?",
          likes: 5,
          isLiked: false,
        },
      ],
    },
  ]);

  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState("");

  const handleLike = (commentId, isReply = false, parentId = null) => {
    setComments((prev) =>
      prev.map((comment) => {
        if (isReply && comment.id === parentId) {
          return {
            ...comment,
            replies: comment.replies.map((reply) =>
              reply.id === commentId
                ? {
                    ...reply,
                    isLiked: !reply.isLiked,
                    likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                  }
                : reply
            ),
          };
        }

        if (comment.id === commentId) {
          return {
            ...comment,
            isLiked: !comment.isLiked,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
          };
        }
        return comment;
      })
    );
  };

  const handleAddReply = (parentId) => {
    if (!replyContent.trim()) return;

    setComments((prev) =>
      prev.map((c) => {
        if (c.id === parentId) {
          const reply = {
            id: Date.now(),
            author: "Bạn",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=User",
            time: "Vừa xong",
            content: replyContent,
            likes: 0,
            isLiked: false,
          };

          return { ...c, replies: [...c.replies, reply] };
        }
        return c;
      })
    );

    setReplyContent("");
    setReplyingTo(null);
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      author: "Bạn",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=User",
      time: "Vừa xong",
      content: newComment,
      likes: 0,
      isLiked: false,
      replies: [],
    };

    setComments([comment, ...comments]);
    setNewComment("");
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
          <MessageSquare className="w-5 h-5" />
          Thảo luận ({comments.length})
        </h2>

        <div className="flex gap-3">
          <Avatar className="w-10 h-10 shrink-0">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" />
            <AvatarFallback>B</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Chia sẻ suy nghĩ của bạn..."
              className="min-h-[100px] resize-none"
            />

            <div className="flex justify-between items-center mt-3">
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Image alt="Image" className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Smile className="w-5 h-5" />
                </Button>
              </div>

              <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                Gửi
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            parentId={null}
            replyingTo={replyingTo}
            setReplyingTo={setReplyingTo}
            replyContent={replyContent}
            setReplyContent={setReplyContent}
            handleAddReply={handleAddReply}
            handleLike={handleLike}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
