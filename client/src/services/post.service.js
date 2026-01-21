import http from "../lib/http";

export const getPosts = async ({ status, tags }) => {
  const params = {
    status,
    ...(tags?.length ? { tags: tags.join(",") } : {}),
  };

  const res = await http.get("/post", { params });
  return res.data;
};

export const getPost = async (id) => {
  const res = await http.get(`/post/${id}`);
  return res.data;
};

export const newPost = async (data) => {
  const res = await http.post("/post/", data);
  return res.data;
};

export const publishPost = async (id) => {
  const res = await http.post(`/post/${id}/publish`);
  return res.data;
};

export const archivePost = async (id) => {
  const res = await http.post(`/post/${id}/archive`);
  return res.data;
};

export const changePostStatus = async ({ id, action }) => {
  const res = await http.post(`/post/${id}/${action}`);
  return res.data;
};

export const updatePost = async (id, data) => {
  const res = await http.put(`/post/${id}`, data);
  return res.data;
};

export const trackPostView = async (postId) => {
  if (!postId) return null;

  const res = await http.post(`/post/${postId}/view`, null, {
    timeout: 3000,
  });

  return res.data;
  // { ok: true, counted: true | false }
};
