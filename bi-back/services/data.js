import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use(cors());

app.get("/ONGdata", async (req, res) => {
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

app.listen(3100, () => {
  console.log("Server is running on port 3100");
});