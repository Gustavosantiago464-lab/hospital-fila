const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   PACIENTE CHAMADO
========================= */
let ultimoChamado = null;

/* =========================
   VER ÚLTIMO CHAMADO
========================= */
app.get("/ultimo", (req, res) => {
  res.json(ultimoChamado);
});

/* =========================
   CHAMAR PACIENTE
========================= */
app.post("/chamar", (req, res) => {
  ultimoChamado = req.body;

  res.json({
    mensagem: "Paciente chamado",
  });
});

/* =========================
   VER FILA
========================= */
app.get("/fila", async (req, res) => {
  try {
    let fila = await prisma.paciente.findMany();

    fila.sort((a, b) => {
      if (
        a.prioridade === "alta" &&
        b.prioridade !== "alta"
      ) {
        return -1;
      }

      if (
        a.prioridade !== "alta" &&
        b.prioridade === "alta"
      ) {
        return 1;
      }

      return 0;
    });

    res.json(fila);
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao buscar fila",
    });
  }
});

/* =========================
   ADICIONAR PACIENTE
========================= */
app.post("/fila", async (req, res) => {
  try {
    const {
      nome,
      prioridade,
      senha,
    } = req.body;

    await prisma.paciente.create({
      data: {
        nome,
        prioridade,
        senha,
      },
    });

    let fila = await prisma.paciente.findMany();

    fila.sort((a, b) => {
      if (
        a.prioridade === "alta" &&
        b.prioridade !== "alta"
      ) {
        return -1;
      }

      if (
        a.prioridade !== "alta" &&
        b.prioridade === "alta"
      ) {
        return 1;
      }

      return 0;
    });

    res.json({
      mensagem: "Paciente adicionado",
      fila,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      erro: "Erro ao adicionar paciente",
    });
  }
});

/* =========================
   REMOVER PACIENTE
========================= */
app.delete("/fila/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.paciente.delete({
      where: {
        id,
      },
    });

    res.json({
      mensagem: "Paciente removido",
    });
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao remover paciente",
    });
  }
});

/* =========================
   SERVIDOR
========================= */
app.listen(3001, () => {
  console.log(
    "🚀 Servidor rodando em http://localhost:3001"
  );
});