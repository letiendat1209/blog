import http from "../lib/http";

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await http.post("/upload/image", formData);
  return res.data.data.url;
};
