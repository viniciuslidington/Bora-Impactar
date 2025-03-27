import express from "express";
import { PrismaClient } from "@prisma/client";

import {validateData} from "../utils/validateFunctions.js";
import {calculateExpirationDate} from "../utils/calculateExpirationDate.js";
import {validatePartialUpdate} from "../utils/validateFunctions.js";

const prisma = new PrismaClient();
const router = express.Router();

// Criar uma repasse
router.post("/", async (req, res) => {
  const validationError = validateData(req.body, false);
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

router.patch("/", async (req, res) => {
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

    const validationError = validatePartialUpdate(req.body);
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
