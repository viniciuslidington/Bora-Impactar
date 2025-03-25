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

const app = express();
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:8080" }));
app.use(cookieParser());

// Usando as rotas nos endpoints apropriados
app.use("/data", dataRoutes);
app.use("/login", loginRoutes);
app.use("/logout", logoutRoutes);
app.use("/repasse", repasseRoutes);
app.use("/search-repasse", serchRoutes);
app.use("/solicitacao", solicitacoesRoutes);
app.use('/search-solicitacao', searchSolicitacoesRoutes);

// Definindo a porta 3000
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000 por meio do proxy");
});