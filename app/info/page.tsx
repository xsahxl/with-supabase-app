"use client"
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import AuthGuard from "@/components/AuthGuard";

type UserInfo = {
  id: string;
  email: string;
};

const Info = () => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setUser({
          id: data.user.id,
          email: data.user.email || "",
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  if (loading) {
    return <div className="p-4 text-gray-500">加载中...</div>;
  }

  if (!user) {
    return <div className="p-4 text-red-500">未登录</div>;
  }

  return (
    <AuthGuard>
      <div className="p-4 bg-white rounded shadow max-w-md mx-auto mt-8">
        <h2 className="text-lg font-bold mb-4">用户信息</h2>
        <div className="mb-2">
          <span className="font-semibold">ID：</span>
          <span>{user.id}</span>
        </div>
        <div>
          <span className="font-semibold">邮箱：</span>
          <span>{user.email}</span>
        </div>
      </div>
    </AuthGuard>
  );
};

export default Info;