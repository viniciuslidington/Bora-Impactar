import express from "express";
import { PrismaClient } from "@prisma/client";

import { validateData } from "../utils/validateFunctions.js";
import { calculateExpirationDate } from "../utils/calculateExpirationDate.js";
import { validatePartialUpdate } from "../utils/validateFunctions.js";

import { uploadImage, deleteImage } from "../services/uploadServices.js";

import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage });

const prisma = new PrismaClient();
const router = express.Router();

// Criar uma solicitacao
router.post("/", upload.single("image"), async (req, res) => {
  const validationError = validateData(req.body, true);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  if (!req.file) {
    return res.status(400).json({ error: "Nenhum arquivo de imagem enviado" });
  }

  try {
    const createdAt = new Date();
    const expirationDate = calculateExpirationDate(
      createdAt,
      req.body.expirationDuration
    );

    const { ong_Id: bodyOng_Id, expirationDuration, ...requestData } = req.body;

    const ong_Id = Number(bodyOng_Id);

    let post_Imagem = null;
    let post_ImagemId = null;

    // Se tiver imagem, faz upload diretamente
    if (req.file) {
      const uploadResponse = await uploadImage(req.file.buffer);
      if (!uploadResponse) {
        return res
          .status(500)
          .json({ error: "Erro ao fazer upload da nova imagem" });
      }

      // Atualizar os dados da imagem
      post_Imagem = uploadResponse.secure_url;
      post_ImagemId = uploadResponse.public_id;
    }

    const newRequest = await prisma.request.create({
      data: {
        ...requestData,
        createdAt,
        expirationDate,
        post_Imagem,
        post_ImagemId,
        ong_Id,
      },
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
router.get("/", async (req, res) => {
  try {
    const id = Number(req.query.ong_Id);

    if (!id || isNaN(id)) {
      return res
        .status(400)
        .json({ error: "Ong_Id é obrigatório e deve ser um número válido" });
    }

    const requests = await prisma.request.findMany({ where: { ong_Id: id } });
    return res.status(200).json(requests);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar solicitações" });
  }
});

// Atualizar solicitacao
router.patch("/", upload.single("image"), async (req, res) => {
  const id = Number(req.query.id || req.body.id);

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "ID inválido ou não fornecido" });
  }

  try {
    const existingRequest = await prisma.request.findUnique({ where: { id } });
    if (!existingRequest) {
      return res.status(404).json({ error: "Solicitação não encontrada" });
    }

    let post_Imagem;
    let post_ImagemId;

    if (req.file) {
      if (existingRequest.post_ImagemId) {
        // Deletar imagem anterior do Cloudinary
        const deleteResult = await deleteImage(existingRequest.post_ImagemId);
        if (!deleteResult) {
          return res
            .status(500)
            .json({ error: "Erro ao deletar imagem antiga" });
        }
      }

      const uploadResponse = await uploadImage(req.file.buffer);
      if (!uploadResponse) {
        return res
          .status(500)
          .json({ error: "Erro ao fazer upload da nova imagem" });
      }

      // Atualizar os dados da imagem
      post_Imagem = uploadResponse.secure_url;
      post_ImagemId = uploadResponse.public_id;
    }

    const validationError = validatePartialUpdate(req.body);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    // Remover expirationDuration e recalcular expirationDate se necessário
    const { expirationDuration, ...updateData } = req.body;

    let expirationDate = existingRequest.expirationDate;
    if (expirationDuration) {
      expirationDate = calculateExpirationDate(
        existingRequest.createdAt,
        expirationDuration
      );
    }

    console.log(id);
    const updatedRequest = await prisma.request.update({
      where: { id },
      data: {
        ...updateData,
        expirationDate, // Atualiza a data de expiração corretamente
        post_Imagem,
        post_ImagemId,
      },
    });

    return res.status(200).json(updatedRequest);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: error.message || "Erro ao atualizar solicitação" });
  }
});

// Deletar solicitacao
router.delete("/", async (req, res) => {
  const id = Number(req.query.id || req.body.id);

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "ID inválido ou não fornecido" });
  }

  try {
    const existingRequest = await prisma.request.findUnique({ where: { id } });

    if (!existingRequest) {
      return res.status(404).json({ error: "Solicitação não encontrada" });
    }

    // Deletar imagem do Cloudinary
    if (existingRequest.post_ImagemId) {
      // Deletar imagem anterior do Cloudinary
      const deleteResult = await deleteImage(existingRequest.post_ImagemId);
      if (!deleteResult) {
        return res.status(500).json({ error: "Erro ao deletar imagem antiga" });
      }
    }

    await prisma.request.delete({ where: { id } });
    return res
      .status(200)
      .json({ message: "Solicitação deletada com sucesso" });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao deletar solicitação" });
  }
});

export default router;
