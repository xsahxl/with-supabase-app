"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    // 退出登录后跳转到登录页面
    router.push("/auth/login");
  };

  return <Button onClick={logout}>Logout</Button>;
}
