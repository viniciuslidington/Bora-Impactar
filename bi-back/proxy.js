import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Importando as rotas dos arquivos
import dataRoutes from "./services/data.js";
import loginRoutes from "./services/login.js";
import logoutRoutes from "./services/logout.js";
import repasseRoutes from "./services/repasse.js";
import serchRoutes from "./services/searchrepasse.js";
import solicitacoesRoutes from "./services/solicitacoes.js";
import searchSolicitacoesRoutes from "./services/searchsolicitacoes.js";
import cloudinaryRoutes from "./services/upload.js";
import verifyToken from "./config/VerifyToken.js";

const PORTBACKEND = 3017;
const PORTFRONT = 3007;

const app = express();
app.use(express.json());
app.use(cors({ credentials: true, origin: `http://localhost:${PORTFRONT}` }));
app.use(cookieParser());

// Rotas públicas
app.use("/login", loginRoutes);
app.use("/logout", logoutRoutes);

// Rotas protegidas(verifyToken é o método de autenticar)
app.use("/data", verifyToken, dataRoutes);
app.use("/repasse", verifyToken, repasseRoutes);
app.use("/search-repasse", verifyToken, serchRoutes);
app.use("/solicitacao", verifyToken, solicitacoesRoutes);
app.use("/search-solicitacao", searchSolicitacoesRoutes);
app.use("/upload", verifyToken, cloudinaryRoutes);

// Definindo a porta 3017
app.listen(PORTBACKEND, () => {
  console.log(`Servidor rodando na porta ${PORTBACKEND} por meio do proxy`);
});
