import http from "../lib/http";

export const getMe = async () => {
  const res = await http.get("/auth/me");
  return res.data;
};

export const refreshToken = async () => {
  const res = await http.post("/auth/refresh");
  return res.data;
};

export const logout = async () => {
  const res = await http.post("/auth/logout");
  return res.data;
};
export const getSessions = () => http.get("/auth/sessions");
export const revokeSession = (id) => http.post(`/auth/sessions/${id}/revoke`);
export const revokeAllSessions = () => http.post("/auth/sessions/revoke-all");
