"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Medico = {
  id?: number;
  nome: string;
  crm: string;
  especialidade: string;
  telefone: string;
  email: string;
};

export default function Medicos() {
  const [nome, setNome] = useState("");
  const [crm, setCrm] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [medicos, setMedicos] = useState<Medico[]>([]);

  const carregarMedicos = async () => {
    const { data, error } = await supabase
      .from("medicos")
      .select("*")
      .order("id", { ascending: true });

    if (!error) {
      setMedicos(data || []);
    }
  };

  useEffect(() => {
    carregarMedicos();
  }, []);

  const cadastrarMedico = async () => {
    const { error } = await supabase
      .from("medicos")
      .insert([
        {
          nome,
          crm,
          especialidade,
          telefone,
          email,
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Médico cadastrado com sucesso!");

    setNome("");
    setCrm("");
    setEspecialidade("");
    setTelefone("");
    setEmail("");

    carregarMedicos();
  };

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-5xl font-bold mb-8">
          👨‍⚕️ Cadastro de Médicos
        </h1>

        <div className="bg-zinc-900 p-6 rounded-3xl mt-8">

          <input
            type="text"
            placeholder="Nome do médico"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full p-4 rounded-xl bg-zinc-800 mb-4"
          />

          <input
            type="text"
            placeholder="CRM"
            value={crm}
            onChange={(e) => setCrm(e.target.value)}
            className="w-full p-4 rounded-xl bg-zinc-800 mb-4"
          />

          <input
            type="text"
            placeholder="Especialidade"
            value={especialidade}
            onChange={(e) => setEspecialidade(e.target.value)}
            className="w-full p-4 rounded-xl bg-zinc-800 mb-4"
          />

          <input
            type="text"
            placeholder="Telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            className="w-full p-4 rounded-xl bg-zinc-800 mb-4"
          />

          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 rounded-xl bg-zinc-800 mb-4"
          />

          <button
            onClick={cadastrarMedico}
            className="w-full bg-blue-600 hover:bg-blue-700 p-4 rounded-xl font-bold text-xl"
          >
            ➕ Cadastrar Médico
          </button>
          <div className="mt-8">
            <h2 className="text-3xl font-bold mb-4">
              Médicos Cadastrados
            </h2>

            {medicos.length === 0 ? (
              <p className="text-gray-400">
                Nenhum médico cadastrado.
              </p>
            ) : (
              medicos.map((medico) => (
                <div
                  key={medico.id}
                  className="bg-zinc-800 p-4 rounded-xl mb-4"
                >
                  <p><strong>Nome:</strong> {medico.nome}</p>
                  <p><strong>CRM:</strong> {medico.crm}</p>
                  <p><strong>Especialidade:</strong> {medico.especialidade}</p>
                  <p><strong>Telefone:</strong> {medico.telefone}</p>
                  <p><strong>E-mail:</strong> {medico.email}</p>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </main>
  );
}