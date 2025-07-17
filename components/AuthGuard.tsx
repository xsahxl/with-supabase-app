"use client";
import { useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type AuthGuardProps = { children: ReactNode };

const AuthGuard = ({ children }: AuthGuardProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getClaims().then(({ data }) => {
      if (data?.claims) setIsLoggedIn(true);
      else setIsLoggedIn(false);
    });
  }, []);

  useEffect(() => {
    if (isLoggedIn === false) {
      router.replace("/auth/login");
    }
  }, [isLoggedIn, router]);

  if (isLoggedIn === null) {
    return <div className="flex items-center justify-center h-screen text-gray-500">加载中...</div>;
  }
  if (!isLoggedIn) {
    // 跳转时不渲染内容
    return null;
  }
  return <>{children}</>;
};

export default AuthGuard; 