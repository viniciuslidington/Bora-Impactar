import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

// Definindo os esquemas de validação
const listOfCategory = [
  "ALIMENTO",
  "SERVICOS",
  "UTENSILIOS",
  "MEDICAMENTOS_HIGIENE",
  "BRINQUEDOS_LIVROS",
  "MOVEIS",
  "ITEMPET",
  "AJUDAFINANCEIRA",
  "OUTRA",
];
const listOfUrgency = ["LOW", "MEDIUM", "HIGH"];

const expirationMapping = {
  "7 dias": 7,
  "2 semanas": 14,
  "4 semanas": 28,
  "12 semanas": 84,
};

const calculateExpirationDate = (createdAt, duration) => {
  const daysToAdd = expirationMapping[duration];
  if (!daysToAdd) return null;
  return new Date(createdAt.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
};


const validateRequest = (data) => {
  const { title, category, urgency, description, quantity, ong_Id, expirationDuration } = data;

  if (!title || !category || !urgency || !expirationDuration) {
    return "Os campos Title, Category, Urgency e ExpirationDuration são obrigatórios";
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

  if (!expirationMapping[expirationDuration]) {
    return "Valor inválido para ExpirationDuration. Escolha entre: '7 dias', '2 semanas', '4 semanas', '12 semanas'.";
  }

  if (description && typeof description !== "string") {
    return "A descrição deve ser uma string";
  }

  if (quantity && (typeof quantity !== "number" || quantity < 1)) {
    return "A quantidade deve ser um número inteiro positivo";
  }

  if (!ong_Id) {
    return "Ong_Id é obrigatório";
  } else if (typeof ong_Id !== "number" || ong_Id < 1) {
    return "Ong_Id deve ser um número inteiro positivo";
  }

  return null;
};

function formatarString(str) {
  return str
    .toLowerCase() // Converte para minúsculas
    .normalize("NFD") // Normaliza caracteres acentuados
    .replace(/[\u0300-\u036f]/g, ""); // Remove acentos
}

// Criar uma solicitacao
app.post("/solicitacao", async (req, res) => {
  const validationError = validateRequest(req.body);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  try {
    const createdAt = new Date();
    const expirationDate = calculateExpirationDate(createdAt, req.body.expirationDuration);

    const { expirationDuration, ...requestData } = req.body;

    const newRequest = await prisma.request.create({
      data: {
        ...requestData, // Inclui title, category, urgency, etc.
        createdAt,      // Define a data de criação
        expirationDate  // Define a data de expiração correta
      }
    });


    return res.status(201).json(newRequest);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: error.message || "Erro ao criar solicitação" });
  }
});

// Buscar todas as soliciações da ong que está logada
app.get("/solicitacao", async (req, res) => {
  try {
    const id = Number(req.query.ong_Id);

    if (!id || isNaN(id)) {
      return res
        .status(400)
        .json({ error: "Ong_Id é obrigatório e deve ser um número válido" });
    }

    const requests = await prisma.request.findMany({ where: { ong_Id: id }, skip, take: limit });
    return res.status(200).json(requests);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar solicitações" });
  }
});

// Fazer uma busca entre as solicitações com filtros
app.get("/search-solicitacao", async (req, res) => {
  try {
    const { category, urgency, sort} = req.query; 
    
    // Constrói os filtros diretamente para a consulta no banco
    const filters = {};
    if (category && listOfCategory.includes(category)) filters.category = category;
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
    if (sort === "recentes") {
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
      totalPages
    });

  } catch (error) {
    console.error("Erro no banco de dados:", error); // Exibe o erro no terminal
    return res.status(500).json({ error: "Erro interno ao buscar solicitações" });
  }
});


// Atualizar solicitacao
app.put("/solicitacao", async (req, res) => {
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

    // Remover expirationDuration e recalcular expirationDate se necessário
    const { expirationDuration, ...updateData } = req.body;

    let expirationDate = existingRequest.expirationDate;
    if (expirationDuration) {
      expirationDate = calculateExpirationDate(existingRequest.createdAt, expirationDuration);
    }

    const updatedRequest = await prisma.request.update({
      where: { id },
      data: {
        ...updateData,
        expirationDate, // Atualiza a data de expiração corretamente
      },
    });

    return res.status(200).json(updatedRequest);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message || "Erro ao atualizar solicitação" });
  }
});

// Deletar solicitacao
app.delete("/solicitacao", async (req, res) => {
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
    return res
      .status(200)
      .json({ message: "Solicitação deletada com sucesso" });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao deletar solicitação" });
  }
});

app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});
