//stores/authStores
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  isAuthenticated: false,
  isBootstrapped: false,

  setAuthenticated: (status) =>
    set({
      isAuthenticated: status,
    }),

  setBootstrapped: () =>
    set({
      isBootstrapped: true,
    }),

  logout: () =>
    set({
      isAuthenticated: false,
      isBootstrapped: true,
    }),
}));
