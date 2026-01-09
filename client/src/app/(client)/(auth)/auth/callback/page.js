// app/auth/callback/page.jsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/auths/useAuth";

export default function OAuthCallbackPage() {
  const router = useRouter();
  const { mutate } = useAuth();

  useEffect(() => {
    // Backend đã set cookie, chỉ cần fetch user
    mutate()
      .then(() => {
        router.push("/");
      })
      .catch(() => {
        router.push("/login");
      });
  }, [mutate, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4 text-gray-600">Completing login...</p>
      </div>
    </div>
  );
}
