import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use(cors());

app.get("/relocacoes", async (req, res) => {

  let relocacoes = [];

  if (req.query) {
    relocacoes = await prisma.relocacao.findMany({
      where: {
        data: {
          title: req.query.title,
          category: req.query.category,
          number: req.query.number,
          description: req.query.description,
        },
      },
    });
  } else {
    relocacoes = await prisma.relocacao.findMany();
  };

  res.status(200).json(relocacoes);
  
});
