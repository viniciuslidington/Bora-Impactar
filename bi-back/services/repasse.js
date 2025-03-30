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

// Criar uma repasse
router.post("/", upload.single("image"), async (req, res) => {
  const validationError = validateData(req.body, false);
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

    const newRequest = await prisma.relocationProduct.create({
      data: {
        ...requestData, // Inclui title, category, urgency, etc.
        createdAt, // Define a data de criação
        expirationDate, // Define a data de expiração correta
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
      .json({ error: error.message || "Erro ao criar repasse" });
  }
});

// Buscar todas as relocacoes da ong que está logada
router.get("/", async (req, res) => {
  try {
    const id = Number(req.query.ong_Id);

    if (!id || isNaN(id)) {
      return res
        .status(400)
        .json({ error: "Ong_Id é obrigatório e deve ser um número válido" });
    }

    const requests = await prisma.relocationProduct.findMany({
      where: { ong_Id: id },
    });
    return res.status(200).json(requests);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar solicitações" });
  }
});

router.patch("/", upload.single("image"), async (req, res) => {
  const id = Number(req.query.id || req.body.id);

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "ID inválido ou não fornecido" });
  }

  try {
    const existingRelocation = await prisma.relocationProduct.findUnique({
      where: { id },
    });

    if (!existingRelocation) {
      return res.status(404).json({ error: "repasse não encontrada" });
    }

    let post_Imagem;
    let post_ImagemId;

    if (req.file) {
      console.log("oi");
      if (existingRelocation.post_ImagemId) {
        // Deletar imagem anterior do Cloudinary
        const deleteResult = await deleteImage(
          existingRelocation.post_ImagemId
        );
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

    const { expirationDuration, ...updateData } = req.body;

    let expirationDate = existingRelocation.expirationDate;
    if (expirationDuration) {
      expirationDate = calculateExpirationDate(
        existingRelocation.createdAt,
        expirationDuration
      );
    }

    const updatedRelocation = await prisma.relocationProduct.update({
      where: { id },
      data: {
        ...updateData,
        expirationDate,
        post_Imagem,
        post_ImagemId,
      },
    });

    return res.status(200).json(updatedRelocation);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: error.message || "Erro ao atualizar repasse" });
  }
});

// Deletar repasse
router.delete("/", async (req, res) => {
  const id = Number(req.query.id || req.body.id);

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "ID inválido ou não fornecido" });
  }

  try {
    const existingRelocation = await prisma.relocationProduct.findUnique({
      where: { id },
    });

    if (!existingRelocation) {
      return res.status(404).json({ error: "repasse não encontrada" });
    }

    // Deletar imagem do Cloudinary
    if (existingRelocation.post_ImagemId) {
      // Deletar imagem anterior do Cloudinary
      const deleteResult = await deleteImage(existingRelocation.post_ImagemId);
      if (!deleteResult) {
        return res.status(500).json({ error: "Erro ao deletar imagem antiga" });
      }
    }

    await prisma.relocationProduct.delete({ where: { id } });
    return res.status(200).json({ message: "repasse deletada com sucesso" });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao deletar repasse" });
  }
});

export default router;
