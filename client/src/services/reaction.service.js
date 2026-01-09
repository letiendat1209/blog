import http from "../lib/http";

// ADD reaction
export const addReaction = async (data) => {
  const res = await http.post("/reactions", data);
  return res.data;
};

// GET reaction summary
export const getReactionSummary = async ({ entityType, entityId }) => {
  const res = await http.get("/reactions/summary", {
    params: { entityType, entityId },
  });
  return res.data;
};

// REMOVE reaction
export const removeReaction = async (data) => {
  const res = await http.delete("/reactions", { data });
  return res.data;
};
