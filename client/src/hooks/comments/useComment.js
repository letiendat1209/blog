import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCommentByEntityId,
  createComment,
  createGuestComment,
  replyComments,
} from "@/services/comment.service";
import { useAuth } from "../auths/useAuth";

// ========== GET COMMENTS ==========
export const useComments = (postId) => {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getCommentByEntityId(postId),
    enabled: !!postId,
    placeholderData: (previousData) => previousData,
  });
};

// ========== CREATE COMMENT ==========
export const useCreateAnyComment = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (comment) => {
      const basePayload = {
        content: comment.content,
        entityType: "POST",
        entityId: comment.postId,
        parentId: comment.parentId,
      };

      if (user) {
        return createComment(basePayload);
      }

      return createGuestComment({
        ...basePayload,
        displayName: comment.displayName,
      });
    },

    onMutate: async (newComment) => {
      const queryKey = ["comments", newComment.postId];
      await queryClient.cancelQueries({ queryKey });

      const previousComments = queryClient.getQueryData(queryKey);

      const tempComment = {
        id: `temp-${Date.now()}`,
        content: newComment.content,
        createdAt: new Date().toISOString(),
        user: user
          ? {
              name: user.name,
              avatarUrl: user.avatarUrl,
            }
          : null,
        displayName: user ? null : newComment.displayName,
        replies: [],
        isOptimistic: true,
      };

      queryClient.setQueryData(queryKey, (old) => {
        if (!old) {
          return { data: [tempComment] };
        }

        return {
          ...old,
          data: [tempComment, ...(old.data || [])],
        };
      });

      return { previousComments };
    },

    onError: (_err, variables, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(
          ["comments", variables.postId],
          context.previousComments
        );
      }
    },

    onSettled: (_data, _err, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.postId],
      });
    },
  });
};

// ========== CREATE REPLY ==========
export const useCreateReply = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: replyComments,
    retry: false,

    onMutate: async (newReply) => {
      const queryKey = ["comments", newReply.postId];
      await queryClient.cancelQueries({ queryKey });

      const previousComments = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (old) => {
        if (!old?.data) return old;

        const tempReply = {
          id: `temp-${Date.now()}`,
          content: newReply.content,
          createdAt: new Date().toISOString(),
          isOptimistic: true,
          user: user
            ? {
                id: user.id,
                name: user.name,
                avatarUrl: user.avatarUrl,
              }
            : null,
          replyToUser: newReply.replyToName
            ? { name: newReply.replyToName }
            : null,
        };

        const addReplyToComment = (comments) => {
          return comments.map((comment) => {
            if (comment.id === newReply.commentId) {
              return {
                ...comment,
                replies: [...(comment.replies ?? []), tempReply],
              };
            }

            if (comment.replies?.length > 0) {
              return {
                ...comment,
                replies: addReplyToComment(comment.replies),
              };
            }

            return comment;
          });
        };

        return {
          ...old,
          data: addReplyToComment(old.data),
        };
      });

      return { previousComments };
    },

    onError: (_err, variables, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(
          ["comments", variables.postId],
          context.previousComments
        );
      }
    },

    onSettled: async (_data, _err, variables) => {
      await new Promise((resolve) => setTimeout(resolve, 300));

      queryClient.invalidateQueries({
        queryKey: ["comments", variables.postId],
        refetchType: "active",
      });
    },
  });
};
