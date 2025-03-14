import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use(cors());

// Definindo os esquemas de validação
const listOfCategory = ["ALIMENTO", "SERVICOS", "UTENSILIOS", "MEDICAMENTOS_HIGIENE", "BRINQUEDOS_LIVROS", "MOVEIS", "ITEMPET", "AJUDAFINANCEIRA", "OUTRA"];
const listOfUrgency = ["LOW", "MEDIUM", "HIGH"];

// Middleware de validação
const validateRequest = (req, res, next) => {
    const { title, category, urgency, description, requestTime } = req.body;

    if (!title || !category || !urgency) {
        return res.status(400).json({ error: "Os campos Title, Category e Urgency são obrigatórios" });
    }

    if (typeof title !== "string" || title.length < 3) {
        return res.status(400).json({ error: "O título deve ter pelo menos 3 caracteres e ser uma string" });
    }

    if (!listOfCategory.includes(category)) {
        return res.status(400).json({ error: "Categoria inválida." });
    }

    if (!listOfUrgency.includes(urgency)) {
        return res.status(400).json({ error: "Nível de urgência inválido. Escolha entre: LOW, MEDIUM, HIGH" });
    }

    next();
};

// Criar um request
app.post("/request", validateRequest, async (req, res) => {
    try {
        const newRequest = await prisma.request.create({ data: req.body });
        return res.status(201).json(newRequest);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao criar solicitação" });
    }
});

// Buscar requests com filtros opcionais
app.get("/request", async (req, res) => {
<<<<<<< HEAD
  try {
      const filters = {};
=======
    try {
        const filters = {};
        if (req.query.title) filters.title = req.query.title;
        if (req.query.category) filters.category = req.query.category;
        if (req.query.urgency) filters.urgency = req.urgency.category;
>>>>>>> aa06f35065bdf5e05e4f29bee84480bc47d4fbc7

      if (req.query.title) filters.title = req.query.title
      if (req.query.category && listOfCategory.includes(req.query.category)) filters.category = req.query.category;
      if (req.query.urgency && listOfUrgency.includes(req.query.urgency)) filters.urgency = req.query.urgency;

<<<<<<< HEAD
      const requests = await prisma.request.findMany({ where: filters });
      return res.status(200).json(requests);
  } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar solicitações" });
  }
=======
        if (req.query.urgency && !["LOW", "MEDIUM", "HIGH"].includes(req.query.category)) {
          return res.status(400).json({ error: "Urgencia inválida." });
        }

        const requests = await prisma.request.findMany({ where: filters });
        return res.status(200).json(requests);

    } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar solicitações" });
    }
>>>>>>> aa06f35065bdf5e05e4f29bee84480bc47d4fbc7
});


// Atualizar request
app.put("/request", validateRequest, async (req, res) => {
  const id = Number(req.query.id || req.body.id);

  if (!id || isNaN(id)) {
      return res.status(400).json({ error: "ID inválido ou não fornecido" });
  }

  try {
      const existingRequest = await prisma.request.findUnique({ where: { id } });

      if (!existingRequest) {
          return res.status(404).json({ error: "Solicitação não encontrada" });
      }

      const { title, category, urgency, description } = req.body;
      const updateData = {};

      if (title) updateData.title = title;
      if (category && listOfCategory.includes(category)) updateData.category = category;
      if (urgency && listOfUrgency.includes(urgency)) updateData.urgency = urgency;
      if (description) updateData.description = description;

      if (Object.keys(updateData).length === 0) {
          return res.status(400).json({ error: "Nenhum campo válido para atualização" });
      }

      const updatedRequest = await prisma.request.update({
          where: { id },
          data: updateData,
      });

      return res.status(200).json(updatedRequest);
  } catch (error) {
      return res.status(500).json({ error: "Erro ao atualizar solicitação" });
  }
});


app.delete("/request", async (req, res) => {
  const id = Number(req.query.id || req.body.id);

  if (!id || isNaN(id)) {
      return res.status(400).json({ error: "ID inválido ou não fornecido" });
  }

  try {
      const existingRequest = await prisma.request.findUnique({ where: { id } });

      if (!existingRequest) {
          return res.status(404).json({ error: "Solicitação não encontrada" });
      }

      await prisma.request.delete({ where: { id } });
      return res.status(200).json({ message: "Solicitação deletada com sucesso" });
  } catch (error) {
      return res.status(500).json({ error: "Erro ao deletar solicitação" });
  }
});


app.listen(3001, () => {
<<<<<<< HEAD
    console.log("Servidor rodando na porta 3001");
});
=======
  console.log("Servidor rodando na porta 3001");
});
>>>>>>> aa06f35065bdf5e05e4f29bee84480bc47d4fbc7
