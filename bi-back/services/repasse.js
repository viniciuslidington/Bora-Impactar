import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

// Definindo os esquemas de validação
const listOfCategory = [
  "eletrodomesticosemoveis",
  "utensiliosgerais",
  "roupasecalcados",
  "saudehigiene",
  "materiaiseducativoseculturais",
  "itensdeinclusaomobilidade",
  "eletronicos",
  "itenspet",
  "outros",
];

const expirationMapping = {
  "7 dias": 7,
  "2 semanas": 14,
  "4 semanas": 28,
  "12 semanas": 84,
};

const calculateExpirationDate = (createdAt, duration) => {
  const daysToAdd = expirationMapping[duration];
  if (!daysToAdd) return null;
  return new Date(createdAt.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
};

const validateRelocation = (data) => {
  const { title, category, description, ong_Id, expirationDuration } = data;

  if (!title || !category || !expirationDuration) {
    return "Os campos Title, expirationDuration e  Category  são obrigatórios";
  }

  if (typeof title !== "string" || title.length < 3) {
    return "O título deve ter pelo menos 3 caracteres e ser uma string";
  }

  if (!listOfCategory.includes(category)) {
    return "Categoria inválida.";
  }

  if (!expirationMapping[expirationDuration]) {
    return "Valor inválido para ExpirationDuration. Escolha entre: '7 dias', '2 semanas', '4 semanas', '12 semanas'.";
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
    const createdAt = new Date();
    const expirationDate = calculateExpirationDate(
      createdAt,
      req.body.expirationDuration
    );

    const { expirationDuration, ...requestData } = req.body;

    const newRequest = await prisma.relocationProduct.create({
      data: {
        ...requestData, // Inclui title, category, urgency, etc.
        createdAt, // Define a data de criação
        expirationDate, // Define a data de expiração correta
      },
    });

    return res.status(201).json(newRequest);
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
    const { category, title, sort } = req.query;

    const filters = {};

    if (req.query.title) filters.title = title;
    if (req.query.category && listOfCategory.includes(req.query.category))
      filters.category = category;

    const totalRequests = await prisma.request.count({ where: filters });

    const limit = parseInt(req.query.limit) || 6;
    const totalPages = Math.max(1, Math.ceil(totalRequests / limit));

    let page = parseInt(req.query.page) || 1;
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;

    const skip = (page - 1) * limit;

    let orderBy = [];
    if (sort === "recentes") {
      orderBy = [{ createdAt: "desc" }]; // Mais recentes primeiro
    } else if (sort === "expirar") {
      orderBy = [{ expirationDate: "asc" }]; // Mais perto de expirar primeiro
    }

    const requests = await prisma.relocationProduct.findMany({
      where: filters,
      skip,
      take: limit,
      orderBy,
    });

    return res.status(200).json({
      requests,
      totalRequests,
      totalPages,
    });
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
    const existingRelocation = await prisma.relocationProduct.findUnique({
      where: { id },
    });

    if (!existingRelocation) {
      return res.status(404).json({ error: "repasse não encontrada" });
    }

    const validationError = validateRelocation(req.body);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const { expirationDuration, ...updateData } = req.body;

    let expirationDate = existingRelocation.expirationDate;
    if (expirationDuration) {
      expirationDate = calculateExpirationDate(
        existingRelocation.createdAt,
        expirationDuration
      );
    }

    const updatedRelocation = await prisma.relocationProduct.update({
      where: { id },
      data: {
        ...updateData,
        expirationDate,
      },
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
