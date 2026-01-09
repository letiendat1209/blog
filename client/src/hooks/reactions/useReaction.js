// hooks/reactions/useReaction.js
import { useReactionSummary } from "./useReactionSummary";
import { useAddReaction } from "./useAddReaction";
import { useRemoveReaction } from "./useRemoveReaction";

export const useReaction = (entityType, entityId) => {
  const summary = useReactionSummary(entityType, entityId);
  const add = useAddReaction(entityType, entityId);
  const remove = useRemoveReaction(entityType, entityId);

  const toggleReaction = (type) => {
    if (summary.data?.myReaction === type) {
      remove.mutate(type);
    } else {
      add.mutate(type);
    }
  };

  return {
    ...summary,
    toggleReaction,
    isReacting: add.isPending || remove.isPending,
  };
};
