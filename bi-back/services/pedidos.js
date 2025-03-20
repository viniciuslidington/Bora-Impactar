import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router(); // Usando Router ao invés de app

// Definindo os esquemas de validação
const listOfCategory = ["ALIMENTO", "SERVICOS", "UTENSILIOS", "MEDICAMENTOS_HIGIENE", "BRINQUEDOS_LIVROS", "MOVEIS", "ITEMPET", "AJUDAFINANCEIRA", "OUTRA"];
const listOfUrgency = ["LOW", "MEDIUM", "HIGH"];

const validateRequest = (data) => {
    const { title, category, urgency, description, quantity } = data;

    if (!title || !category || !urgency) {
        return "Os campos Title, Category e Urgency são obrigatórios";
    }

    if (typeof title !== "string" || title.length < 3) {
        return "O título deve ter pelo menos 3 caracteres e ser uma string";
    }

    if (!listOfCategory.includes(category)) {
        return "Categoria inválida.";
    }

    if (!listOfUrgency.includes(urgency)) {
        return "Nível de urgência inválido. Escolha entre: LOW, MEDIUM, HIGH";
    }
    
    if (description && typeof description !== "string") {
        return "A descrição deve ser uma string";
    }

    if (quantity && (typeof quantity !== "number" || quantity < 1)) {
        return "A quantidade deve ser um número inteiro positivo";
    }

    return null;
};

// Criar um request
router.post("/request", async (req, res) => {
    const validationError = validateRequest(req.body);
    if (validationError) {
        return res.status(400).json({ error: validationError });
    }

    try {
        const newRequest = await prisma.request.create({ data: req.body });
        return res.status(201).json(newRequest);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message || "Erro ao criar solicitação" });
    }
});

// Buscar requests com filtros opcionais
router.get("/request", async (req, res) => {
  try {
      const filters = {};

      if (req.query.title) filters.title = req.query.title;
      if (req.query.category && listOfCategory.includes(req.query.category)) filters.category = req.query.category;
      if (req.query.urgency && listOfUrgency.includes(req.query.urgency)) filters.urgency = req.query.urgency;

      const requests = await prisma.request.findMany({ where: filters });
      return res.status(200).json(requests);
  } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar solicitações" });
  }
});

// Atualizar request
router.put("/request", async (req, res) => {
    const id = Number(req.query.id || req.body.id);

    if (!id || isNaN(id)) {
        return res.status(400).json({ error: "ID inválido ou não fornecido" });
    }

    try {
        const existingRequest = await prisma.request.findUnique({ where: { id } });

        if (!existingRequest) {
            return res.status(404).json({ error: "Solicitação não encontrada" });
        }

        const validationError = validateRequest(req.body);
        if (validationError) {
            return res.status(400).json({ error: validationError });
        }

        const updatedRequest = await prisma.request.update({
            where: { id },
            data: req.body,
        });

        return res.status(200).json(updatedRequest);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message || "Erro ao atualizar solicitação" });
    }
});

// Deletar request
router.delete("/request", async (req, res) => {
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

// Exporta o router
export default router;