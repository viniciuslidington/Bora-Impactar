import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import jwt from "jsonwebtoken";
// import dotenv from "dotenv"; ADICIONAR DEPOIS EM HOMOLOGAÇÃO
import cookieParser from "cookie-parser";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();
const SECRET_KEY =
  "0a81fe9aab38c9011ed6542b2eb9a3db62a0c48dc496699bde624e1c5dbe4232";

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

const processData = (data) => {
  return {
    id: data.id,
    name: data.name,
    description: data.description,
    is_formalized: data.is_formalized,
    start_year: data.start_year,
    contact_phone: data.contact_phone,
    instagram_link: data.instagram_link,
    x_link: data.x_link,
    facebook_link: data.facebook_link,
    pix_qr_code_link: data.pix_qr_code_link,
    gallery_images_url: data.gallery_images_url.join(", "), // URLs separadas por vírgulas
    skills: data.skills.map((skill) => skill.name).join(", "), // Apenas os nomes das skills
    causes: data.causes.map((cause) => cause.name).join(", "), // Apenas os nomes das causes
    sustainable_development_goals: data.sustainable_development_goals
      .map((goal) => goal.name)
      .join(", "), // Apenas os nomes dos objetivos
  };
};

app.post("/login", async (req, res) => {
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
  
      const token = jwt.sign({ email, user: data.user.name, userData: data }, SECRET_KEY, { expiresIn: "1h" });
  
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

  app.get("/auth", async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "Token não fornecido" });
    }
  
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Token inválido" });
      }
  
      console.log("Token decodificado:", decoded); // Verifique a estrutura
  
      // Retorna um objeto com `user`, garantindo que `name` esteja presente
      res.json({user: decoded.user, userData: decoded.userData });
    });
  });

app.post("/logout", (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logout bem-sucedido' });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
