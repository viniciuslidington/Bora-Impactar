import express from "express";
import { PrismaClient } from "@prisma/client";

import { listOfCategory } from "../config/config.js";

const prisma = new PrismaClient();
const router = express.Router();

// Fazer uma busca entre as relocacoes com filtros
router.get("/", async (req, res) => {
  try {
    const { title, category, sort } = req.query;

    const filters = {};

    if (title) {
      const words = title.split(" ").filter((word) => word.trim() !== ""); // Divide a string em palavras
      filters.AND = words.map((word) => ({
        title: { contains: word, mode: "insensitive" }, // Busca parcial, case-insensitive
      }));
    }

    if (req.query.category && listOfCategory.includes(req.query.category))
      filters.category = category;

    const totalRepasses = await prisma.relocationProduct.count({
      where: filters,
    });

    const limit = parseInt(req.query.limit) || 6;
    const totalPages = Math.max(1, Math.ceil(totalRepasses / limit));

    let page = parseInt(req.query.page) || 1;
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;

    const skip = (page - 1) * limit;

    let orderBy = [];
    if (!sort || sort === "recentes") {
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
      totalRepasses,
      totalPages,
    });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar solicitações" });
  }
});

export default router;
