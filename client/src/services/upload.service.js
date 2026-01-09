import http from "../lib/http";

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file); // 👈 match upload.single("file")

  const res = await http.post("/upload/image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data.data.url;
};
