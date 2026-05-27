"use client";

export default function LoginPage() {
  const entrar = () => {
    window.location.href = "/dashboard";
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center text-white">
      <div className="bg-zinc-900 p-10 rounded-3xl w-[400px]">
        <h1 className="text-5xl font-bold text-center mb-8">
          🏥 Hospital
        </h1>
        
        <input
          type="text"
          placeholder="Usuário"
          className="w-full p-4 rounded-xl bg-zinc-800 mb-4"
        />

        <input
          type="password"
          placeholder="Senha"
          className="w-full p-4 rounded-xl bg-zinc-800 mb-6"
        />

        <button
          onClick={entrar}
          className="w-full bg-blue-600 p-4 rounded-xl text-2xl font-bold"
        >
          Entrar
        </button>
      </div>
    </main>
  );
}