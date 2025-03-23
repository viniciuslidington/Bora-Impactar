import express from "express";
import { PrismaClient } from "@prisma/client";

import { listOfCategory, expirationMapping } from "../config/config.js";

const prisma = new PrismaClient();
const router = express.Router();

const calculateExpirationDate = (createdAt, duration) => {
  const daysToAdd = expirationMapping[duration];
  if (!daysToAdd) return null;
  return new Date(createdAt.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
};

const validateRelocation = (data) => {
  const {
    title,
    category,
    description,
    quantity,
    ong_Id,
    ong_Nome,
    ong_Imagem,
    ong_Phone,
    ong_Email,
    expirationDuration
  } = data;

  if (!title || !category || !expirationDuration || !ong_Id || !ong_Nome) {
    return "Os campos Title, Category, expirationDuration, ong_Id e ong_Nome são obrigatórios";
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

  if (typeof ong_Id !== "number" || ong_Id < 1) {
    return "Ong_Id deve ser um número inteiro positivo";
  }

  if (typeof ong_Nome !== "string" ) {
    return "Ong_Nome deve ser uma string";
  }

  if (ong_Imagem && typeof ong_Imagem !== "string" ) {
    return "Ong_Imagem deve ser uma string";
  }

  if (ong_Phone && typeof ong_Phone !== "string" ) {
    return "Ong_Phone deve ser uma string";
  }

  if (ong_Email && typeof ong_Email !== "string" ) {
    return "ong_Email deve ser uma string";
  }

  if (description && typeof description !== "string") {
    return "A descrição deve ser uma string";
  }

  if (quantity && (typeof quantity !== "number" || quantity < 1)) {
    return "A quantidade deve ser um número inteiro positivo";
  }

  return null;
};

// Criar uma repasse
router.post("/", async (req, res) => {
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
router.get("/", async (req, res) => {
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

// Atualizar repasse
router.put("/", async (req, res) => {
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
router.delete("/", async (req, res) => {
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

export default router;
