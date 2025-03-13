import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import { z } from "zod";

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use(cors());

// Definindo os esquemas de validação
const requestSchema = z.object({
    title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
    category: z.enum(["ALIMENTO", "SERVICOS", "UTENSILIOS", "MEDICAMENTOS_HIGIENE", "BRINQUEDOS_LIVROS", "MOVEIS", "ITEMPET", "AJUDAFINANCEIRA", "OUTRA"], {
        errorMap: () => ({ message: "Categoria inválida." }),
    }),
    urgency: z.enum(["LOW", "MEDIUM", "HIGH"], {
        errorMap: () => ({ message: "Nível de urgência inválido. Escolha entre: Low, Medium, High" }),
    }),
    description: z.string().optional(),
    requestTime: z.coerce.date().optional(), // Converte strings para Date automaticamente
});

// Criar um request
app.post("/request", async (req, res) => {
    const result = requestSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({ error: "Dados inválidos", details: result.error.format() });
    }

    try {
        const newRequest = await prisma.request.create({ data: result.data });
        return res.status(201).json(newRequest);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao criar solicitação" });
    }
});

// Buscar requests com filtros opcionais
app.get("/request", async (req, res) => {
    try {
        const filters = {};
        if (req.query.title) filters.title = req.query.title;
        if (req.query.category) filters.category = req.query.category;

        if (req.query.category && !["ALIMENTO", "SERVICOS", "UTENSILIOS", "MEDICAMENTOS_HIGIENE", "BRINQUEDOS_LIVROS", "MOVEIS", "ITEMPET", "AJUDAFINANCEIRA", "OUTRA"].includes(req.query.category)) {
          return res.status(400).json({ error: "Categoria inválida." });
        }

        const requests = await prisma.request.findMany({ where: filters });
        return res.status(200).json(requests);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar solicitações" });
    }
});

// Atualizar request
app.put("/request", async (req, res) => {
  const id = req.query.id || req.body.id;  // Tenta pegar o ID primeiro pela query string, depois pelo corpo

  if (!id) {
    return res.status(400).json({ error: "ID não fornecido na query nem no corpo da requisição" });
  }

  const result = requestSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: "Dados inválidos", details: result.error.format() });
  }

  try {
    const requestId = parseInt(id, 10);  // Converte o ID para número
    const existingRequest = await prisma.request.findUnique({ where: { id: requestId } });
    if (!existingRequest) {
      return res.status(404).json({ error: "Solicitação não encontrada" });
    }

    const updatedRequest = await prisma.request.update({
      where: { id: requestId },
      data: result.data,
    });

    return res.status(200).json(updatedRequest);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao atualizar solicitação" });
  }
});


// Deletar request
app.delete("/request", async (req, res) => {
  const id = req.query.id || req.body.id;  // Tenta pegar o ID primeiro pela query string, depois pelo corpo

  if (!id) {
    return res.status(400).json({ error: "ID não fornecido na query nem no corpo da requisição" });
  }

  try {
    const requestId = parseInt(id, 10);  // Converte o ID para número
    const existingRequest = await prisma.request.findUnique({ where: { id: requestId } });
    if (!existingRequest) {
      return res.status(404).json({ error: "Solicitação não encontrada" });
    }

    await prisma.request.delete({ where: { id: requestId } });
    return res.status(200).json({ message: "Solicitação deletada com sucesso" });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao deletar solicitação" });
  }
});



app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});

