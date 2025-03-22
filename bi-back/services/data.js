import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router(); 

router.get("/ONGdata", async (req, res) => {
  let requests = [];

  if (req.query.id) {
    // Consulta pelo id
    const id = parseInt(req.query.id, 10);
    requests = await prisma.oNGdata.findUnique({
      where: { id: id },
    });
  } else {
    // Consulta todos os registros
    requests = await prisma.oNGdata.findMany();
  }

  res.status(200).json(requests);
});

export default router;