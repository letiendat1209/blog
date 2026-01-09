"use client";

import { useAuth } from "@/hooks/auths/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuard({ children, role }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    // ❌ KHÔNG redirect login ở đây
    if (user && role && user.role !== role) {
      router.replace("/403");
    }
  }, [loading, user, role, router]);

  // ⛔ chưa có user thì để middleware xử lý
  if (loading || !user) {
    return null;
  }

  return children;
}
