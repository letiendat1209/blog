// hooks/reactions/useReactionSummary.js
import { useQuery } from "@tanstack/react-query";
import { getReactionSummary } from "@/services/reaction.service";

export const useReactionSummary = (entityType, entityId) => {
  return useQuery({
    queryKey: ["reaction-summary", entityType, entityId],
    queryFn: () =>
      getReactionSummary({
        entityType,
        entityId,
      }),
    enabled: !!entityType && !!entityId,
  });
};
