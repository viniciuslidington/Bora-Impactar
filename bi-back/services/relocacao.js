import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use(cors());

// Definindo os esquemas de validação
const listOfCategory = ["ALIMENTO", "SERVICOS", "UTENSILIOS", "MEDICAMENTOS_HIGIENE", "BRINQUEDOS_LIVROS", "MOVEIS", "ITEMPET", "AJUDAFINANCEIRA", "OUTRA"];

const validateRelocation = (data) => {
    const { title, category, number, description } = data;

    if (!title || !category || !number) {
        return "Os campos Title, Category e Number são obrigatórios";
    }

    if (typeof title !== "string" || title.length < 3) {
        return "O título deve ter pelo menos 3 caracteres e ser uma string";
    }

    if (!listOfCategory.includes(category)) {
        return "Categoria inválida.";
    }

    if (typeof number !== "number" || number < 1) {
        return "O número deve ser um valor inteiro positivo";
    }

    if (description && typeof description !== "string") {
        return "A descrição deve ser uma string";
    }

    return null;
};

// Criar uma relocação
app.post("/relocacoes", async (req, res) => {
    const validationError = validateRelocation(req.body);
    if (validationError) {
        return res.status(400).json({ error: validationError });
    }

    try {
        const newRelocation = await prisma.RelocationProduct.create({ data: req.body });
        return res.status(201).json(newRelocation);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message || "Erro ao criar relocação" });
    }
});

// Buscar relocações com filtros opcionais
app.get("/relocacoes", async (req, res) => {
    try {
        const filters = {};

        if (req.query.title) filters.title = req.query.title;
        if (req.query.category && listOfCategory.includes(req.query.category)) filters.category = req.query.category;

        const relocations = await prisma.RelocationProduct.findMany({ where: filters });
        return res.status(200).json(relocations);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar relocações" });
    }
});

// Atualizar relocação
app.put("/relocacoes", async (req, res) => {
    const id = Number(req.query.id || req.body.id);

    if (!id || isNaN(id)) {
        return res.status(400).json({ error: "ID inválido ou não fornecido" });
    }

    try {
        const existingRelocation = await prisma.RelocationProduct.findUnique({ where: { id } });

        if (!existingRelocation) {
            return res.status(404).json({ error: "Relocação não encontrada" });
        }

        const validationError = validateRelocation(req.body);
        if (validationError) {
            return res.status(400).json({ error: validationError });
        }

        const updatedRelocation = await prisma.RelocationProduct.update({
            where: { id },
            data: req.body,
        });

        return res.status(200).json(updatedRelocation);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message || "Erro ao atualizar relocação" });
    }
});

// Deletar relocação
app.delete("/relocacoes", async (req, res) => {
    const id = Number(req.query.id || req.body.id);

    if (!id || isNaN(id)) {
        return res.status(400).json({ error: "ID inválido ou não fornecido" });
    }

    try {
        const existingRelocation = await prisma.RelocationProduct.findUnique({ where: { id } });

        if (!existingRelocation) {
            return res.status(404).json({ error: "Relocação não encontrada" });
        }

        await prisma.RelocationProduct.delete({ where: { id } });
        return res.status(200).json({ message: "Relocação deletada com sucesso" });
    } catch (error) {
        return res.status(500).json({ error: "Erro ao deletar relocação" });
    }
});

app.listen(3002, () => {
    console.log("Servidor rodando na porta 3002");
});