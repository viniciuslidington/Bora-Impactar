import express from "express";
import fetch from "node-fetch";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();
// import dotenv from "dotenv"; ADICIONAR DEPOIS EM HOMOLOGAÇÃO
import { PrismaClient } from "@prisma/client";
import {processData} from "../utils/processData.js";

const router = express.Router();
const prisma = new PrismaClient();


router.post("/", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      let response;
      try {
        response = await fetch("https://bora-impactar-prd.setd.rdmapps.com.br/api/login.json", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
      } catch (fetchError) {
        console.error("Network error:", fetchError);
        return res.status(500).json({ error: "External service unavailable" });
      }
  
      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("Failed to login:", errorResponse);
        return res.status(response.status).json({ error: errorResponse.message || "Invalid login or password" });
      }
  
      const data = await response.json();
      const processedData = processData(data.ngo);
  
      await prisma.oNGdata.upsert({
        where: { id: processedData.id },
        update: processedData,
        create: processedData,
      });
  
      const token = jwt.sign({ email, user: data.user.name, userData: data }, process.env.SECRET_KEY, { expiresIn: "1h" });
  
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
      });
  
      return res.status(200).json(data);
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

router.get("/", async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "Token não fornecido" });
    }
  
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Token inválido" });
      }
  
      //console.log("Token decodificado:", decoded); // Verifique a estrutura
  
      // Retorna um objeto com `user`, garantindo que `name` esteja presente
      res.json({user: decoded.user, userData: decoded.userData });
    });
  });

export default router
