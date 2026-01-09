// hooks/reactions/useAddReaction.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addReaction } from "@/services/reaction.service";

export const useAddReaction = (entityType, entityId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (type) =>
      addReaction({
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

          // remove reaction cũ
          if (next.myReaction) {
            next.counts[next.myReaction] =
              (next.counts[next.myReaction] || 1) - 1;
          }

          // add reaction mới
          next.myReaction = type;
          next.counts[type] = (next.counts[type] || 0) + 1;

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
