import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router(); // Usando Router ao invés de app

// Defina suas rotas
router.get("/ONGdata", async (req, res) => {
  let requests = [];
  
  if (req.query.id) {
    const id = parseInt(req.query.id, 10);
    requests = await prisma.oNGdata.findUnique({ where: { id: id } });
  } else {
    requests = await prisma.oNGdata.findMany();
  }
  
  res.status(200).json(requests);
});

// Exporta o router
export default router;