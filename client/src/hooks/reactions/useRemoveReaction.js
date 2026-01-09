// hooks/reactions/useRemoveReaction.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeReaction } from "@/services/reaction.service";

export const useRemoveReaction = (entityType, entityId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (type) =>
      removeReaction({
        entityType,
        entityId,
        type,
      }),

    onMutate: async (type) => {
      await queryClient.cancelQueries({
        queryKey: ["reaction-summary", entityType, entityId],
      });

      const prev = queryClient.getQueryData([
        "reaction-summary",
        entityType,
        entityId,
      ]);

      if (!prev) return { prev };

      queryClient.setQueryData(
        ["reaction-summary", entityType, entityId],
        (old) => {
          if (!old) return old;

          const next = structuredClone(old);

          next.myReaction = null;
          next.counts[type] = Math.max((next.counts[type] || 1) - 1, 0);

          return next;
        }
      );

      return { prev };
    },

    onError: (_, __, context) => {
      if (context?.prev) {
        queryClient.setQueryData(
          ["reaction-summary", entityType, entityId],
          context.prev
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["reaction-summary", entityType, entityId],
      });
    },
  });
};
