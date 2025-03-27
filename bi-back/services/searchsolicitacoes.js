import express from "express";
import { PrismaClient } from "@prisma/client";

import { listOfCategory, listOfUrgency } from "../config/config.js";

const prisma = new PrismaClient();
const router = express.Router();

// Fazer uma busca entre as solicitações com filtros
router.get("/", async (req, res) => {
  try {
    const { title, category, urgency, sort } = req.query;

    // Constrói os filtros diretamente para a consulta no banco
    const filters = {};
    if (title) {
      const words = title.split("+"); // Divide a string em palavras
      filters.AND = words.map((word) => ({
        title: { contains: word, mode: "insensitive" }, // Busca parcial, case-insensitive
      }));
    } 
    if (category && listOfCategory.includes(category))
      filters.category = category;
    if (urgency && listOfUrgency.includes(urgency)) filters.urgency = urgency;

    const totalRequests = await prisma.request.count({ where: filters });

    const limit = parseInt(req.query.limit) || 6;
    const totalPages = Math.max(1, Math.ceil(totalRequests / limit));

    // Tratamento do parâmetro "page"
    let page = parseInt(req.query.page) || 1; // Se for inválido, assume 1
    if (page < 1) page = 1; // Impede valores negativos ou zero
    if (page > totalPages) page = totalPages; // Impede páginas maiores que o total

    const skip = (page - 1) * limit;

    let orderBy = [];
    if (!sort || sort === "recentes") {
      orderBy = [{ createdAt: "desc" }]; // Mais recentes primeiro
    } else if (sort === "expirar") {
      orderBy = [{ expirationDate: "asc" }]; // Mais perto de expirar primeiro
    }

    // Consulta filtrada, paginada e ordenada
    const requests = await prisma.request.findMany({
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
    console.error("Erro no banco de dados:", error); // Exibe o erro no terminal
    return res
      .status(500)
      .json({ error: "Erro interno ao buscar solicitações" });
  }
});

export default router;