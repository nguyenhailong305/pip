import LoginContainer from "@/containers/auth/login";
import React, { useEffect } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("sb-localhost-auth-token");
    if (user) {
      router.push("/");
    }
  }, []);

  return (
    <div>
        <LoginContainer />
    </div>
  );
}