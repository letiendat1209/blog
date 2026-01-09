import http from "../lib/http";

export const getCommentByEntityId = async (id) => {
  const res = await http.get(`/comments?entityType=POST&entityId=${id}`);
  return res.data;
};

export const createComment = async (data) => {
  const res = await http.post("/comments", data);
  return res.data.data;
};

export const createGuestComment = async (data) => {
  const res = await http.post("/comments/guest", data);
  return res.data.data;
};

export const getReplyComments = async (id) => {
  const res = await http.get(`/comments?entityType=COMMENT&entityId=${id}`);
  return res.data;
};

export const replyComments = async ({ commentId, content }) => {
  const res = await http.post(`/comments/${commentId}/replies`, { content });
  return res.data;
};

export const deleteComment = async (id) => {
  const res = await http.delete(`/comments/${id}`);
  return res.data;
};
