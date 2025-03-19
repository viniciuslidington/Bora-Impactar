import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

// Definindo os esquemas de validação
const listOfCategory = [
  "ALIMENTO",
  "SERVICOS",
  "UTENSILIOS",
  "MEDICAMENTOS_HIGIENE",
  "BRINQUEDOS_LIVROS",
  "MOVEIS",
  "ITEMPET",
  "AJUDAFINANCEIRA",
  "OUTRA",
];
const validateRelocation = (data) => {
  const { title, category, description, ong_Id } = data;

  if (!title || !category) {
    return "Os campos Title e Category  são obrigatórios";
  }

  if (typeof title !== "string" || title.length < 3) {
    return "O título deve ter pelo menos 3 caracteres e ser uma string";
  }

  if (!listOfCategory.includes(category)) {
    return "Categoria inválida.";
  }

  if (description && typeof description !== "string") {
    return "A descrição deve ser uma string";
  }

  if (!ong_Id) {
    return "Ong_Id é obrigatório";
  } else if (typeof ong_Id !== "number" || ong_Id < 1) {
    return "Ong_Id deve ser um número inteiro positivo";
  }

  return null;
};

// Criar uma repasse
app.post("/repasse", async (req, res) => {
  const validationError = validateRelocation(req.body);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  try {
    const newRelocation = await prisma.RelocationProduct.create({
      data: req.body,
    });
    return res.status(201).json(newRelocation);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: error.message || "Erro ao criar repasse" });
  }
});

// Buscar todas as relocacoes da ong que está logada
app.get("/repasse", async (req, res) => {
  try {
    const id = Number(req.query.ong_Id);

    if (!id || isNaN(id)) {
      return res
        .status(400)
        .json({ error: "Ong_Id é obrigatório e deve ser um número válido" });
    }

    const requests = await prisma.relocationProduct.findMany({
      where: { ong_Id: id },
    });
    return res.status(200).json(requests);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar solicitações" });
  }
});
// Fazer uma busca entre as relocacoes com filtros
app.get("/search-repasse", async (req, res) => {
  try {
    const filters = {};

    if (req.query.title) filters.title = req.query.title;
    if (req.query.category && listOfCategory.includes(req.query.category))
      filters.category = req.query.category;

    const requests = await prisma.relocationProduct.findMany({
      where: filters,
    });
    return res.status(200).json(requests);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar solicitações" });
  }
});

// Atualizar repasse
app.put("/repasse", async (req, res) => {
  const id = Number(req.query.id || req.body.id);

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "ID inválido ou não fornecido" });
  }

  try {
    const existingRelocation = await prisma.RelocationProduct.findUnique({
      where: { id },
    });

    if (!existingRelocation) {
      return res.status(404).json({ error: "repasse não encontrada" });
    }

    const validationError = validateRelocation(req.body);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const updatedRelocation = await prisma.RelocationProduct.update({
      where: { id },
      data: req.body,
    });

    return res.status(200).json(updatedRelocation);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: error.message || "Erro ao atualizar repasse" });
  }
});

// Deletar repasse
app.delete("/repasse", async (req, res) => {
  const id = Number(req.query.id || req.body.id);

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "ID inválido ou não fornecido" });
  }

  try {
    const existingRelocation = await prisma.RelocationProduct.findUnique({
      where: { id },
    });

    if (!existingRelocation) {
      return res.status(404).json({ error: "repasse não encontrada" });
    }

    await prisma.RelocationProduct.delete({ where: { id } });
    return res.status(200).json({ message: "repasse deletada com sucesso" });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao deletar repasse" });
  }
});

app.listen(3002, () => {
  console.log("Servidor rodando na porta 3002");
});
