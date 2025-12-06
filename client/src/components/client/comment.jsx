import { Heart, Share2, MoreHorizontal, Reply } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";

const Comment = ({
  comment,
  parentId,
  handleLike,
  replyingTo,
  setReplyingTo,
  replyContent,
  setReplyContent,
  handleAddReply,
}) => {
  return (
    <div className="flex gap-3">
      <Avatar className="w-8 h-8 shrink-0">
        <AvatarImage src={comment.avatar} />
        <AvatarFallback>{comment.author[0]}</AvatarFallback>
      </Avatar>

      <div className="flex-1">
        <Card className="p-3 bg-muted/50 border-0">
          <div className="flex items-center justify-between">
            <div className="font-semibold text-sm">{comment.author}</div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                <DropdownMenuItem>Xóa</DropdownMenuItem>
                <DropdownMenuItem>Báo cáo</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <p className="text-sm mt-1">{comment.content}</p>
        </Card>

        <div className="flex items-center gap-4 mt-2 ml-1 text-muted-foreground">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleLike(comment.id, !!parentId, parentId)}
            className={`p-0 h-auto ${comment.isLiked ? "text-red-500" : ""}`}
          >
            <Heart
              className={`w-4 h-4 mr-1 ${
                comment.isLiked ? "fill-current" : ""
              }`}
            />
            {comment.likes}
          </Button>

          {!parentId && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                setReplyingTo(replyingTo === comment.id ? null : comment.id)
              }
              className="p-0 h-auto"
            >
              <Reply className="w-4 h-4 mr-1" />
              Trả lời
            </Button>
          )}

          <Button variant="ghost" size="sm" className="p-0 h-auto">
            <Share2 className="w-4 h-4 mr-1" /> Chia sẻ
          </Button>
        </div>

        {/* Reply input */}
        {replyingTo === comment.id && (
          <div className="flex gap-2 mt-3">
            <Avatar className="w-8 h-8 shrink-0">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" />
              <AvatarFallback>B</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <Textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Viết câu trả lời..."
                className="min-h-[80px]"
              />

              <div className="flex justify-end gap-2 mt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setReplyingTo(null)}
                >
                  Hủy
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleAddReply(comment.id)}
                  disabled={!replyContent.trim()}
                >
                  Trả lời
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Replies */}
        {comment.replies?.length > 0 && (
          <div className="mt-3 ml-2 space-y-3">
            {comment.replies.map((reply) => (
              <Comment
                key={reply.id}
                comment={reply}
                parentId={comment.id}
                replyingTo={replyingTo}
                setReplyingTo={setReplyingTo}
                replyContent={replyContent}
                setReplyContent={setReplyContent}
                handleAddReply={handleAddReply}
                handleLike={handleLike}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
