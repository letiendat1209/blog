// hooks/useAuth.js
import useSWR from "swr";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { getMe, logout as logoutService } from "@/services/auth.service";

export const useAuth = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { setAuthenticated, logout: logoutStore } = useAuthStore();

  // 🔥 FIX: Public paths không fetch
  const publicPaths = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ];
  const shouldFetch = !publicPaths.includes(pathname);

  const { data, error, isLoading, mutate } = useSWR(
    shouldFetch ? "/auth/me" : null,
    getMe,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false,
      onSuccess: () => {
        setAuthenticated(true);
      },
      onError: (err) => {
        return;
      },
    }
  );

  const logout = async () => {
    try {
      await logoutService();
    } catch (error) {
      console.error("[Logout] Failed:", error);
    } finally {
      logoutStore();
      mutate(null, false);
      router.push("/login");
    }
  };

  return {
    user: data?.data ?? null,
    loading: isLoading,
    error,
    isAuthenticated: !!data?.data,
    logout,
    mutate,
  };
};

// // hooks/useAuth.js
// import useSWR from "swr";
// import { useRouter } from "next/navigation";
// import { useAuthStore } from "@/stores/authStore";
// import { getMe, logout as logoutService } from "@/services/auth.service";

// export const useAuth = () => {
//   const router = useRouter();
//   const { setAuthenticated, logout: logoutStore } = useAuthStore();

//   const { data, error, isLoading, mutate } = useSWR("/auth/me", getMe, {
//     revalidateOnFocus: false,
//     revalidateOnReconnect: false,
//     shouldRetryOnError: false,

//     onSuccess: () => {
//       setAuthenticated(true);
//     },

//     onError: (err) => {
//       // ⚠️ Chỉ ignore, KHÔNG set false
//       // 401 tạm thời (access token hết hạn) → interceptor xử
//       // 401 thật (refresh fail) → interceptor logout + redirect
//       return;
//     },
//   });

//   const logout = async () => {
//     try {
//       await logoutService();
//     } catch (error) {
//       console.error("[Logout] Failed:", error);
//     } finally {
//       logoutStore();
//       mutate(null, false); // clear cache, không revalidate
//       router.push("/login");
//     }
//   };

//   return {
//     user: data?.data ?? null,
//     loading: isLoading,
//     error,
//     isAuthenticated: !!data?.data,
//     logout,
//     mutate,
//   };
// };
