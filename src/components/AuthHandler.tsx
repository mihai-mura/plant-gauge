"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getToken } from "~/utils/localStore";
import FullPageLoader from "./FullPageLoader";

interface AuthHandlerProps {
  children: React.ReactNode;
  type: "public" | "private";
}

const AuthHandler = ({ children, type }: AuthHandlerProps) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (type === "public" && getToken()) {
      router.push("/dashboard");
    } else if (type === "private" && !getToken()) {
      router.push("/");
    } else {
      setLoading(false);
    }
  }, [router, type]);

  if (loading) {
    return <FullPageLoader />;
  }

  return <>{children}</>;
};

export default AuthHandler;
