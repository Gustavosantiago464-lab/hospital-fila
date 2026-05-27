"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const logado = localStorage.getItem("logado");

    if (logado === "true") {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, []);

  return null;
}