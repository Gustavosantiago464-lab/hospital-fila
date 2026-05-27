"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const fazerLogin = () => {
    if (usuario === "admin" && senha === "123") {
      localStorage.setItem("logado", "true");

      router.push("/dashboard");
    } else {
      alert("Usuário ou senha inválidos");
    }
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center text-white">
      <div className="bg-blue-950/70 p-10 rounded-3xl w-[400px] border border-blue-400">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold">
            🏥 Hospital
          </h1>

          <p className="text-gray-300 mt-2">
            Sistema Inteligente
          </p>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Usuário"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="w-full p-4 rounded-xl bg-blue-900/60"
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full p-4 rounded-xl bg-blue-900/60"
          />

          <button
            onClick={fazerLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 transition p-4 rounded-xl text-2xl font-bold"
          >
            Entrar
          </button>
        </div>
      </div>
    </main>
  );
}