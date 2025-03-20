import express from "express";
import cors from "cors";

// Importando as rotas dos arquivos
import dataRoutes from "./data.js";  
import loginRoutes from "./login.js"; 
import relocacaoRoutes from "./relocacao.js"; 
import pedidosRoutes from "./pedidos.js"; 

const app = express();
app.use(express.json());
app.use(cors());

// Usando as rotas nos endpoints apropriados
app.use("/data", dataRoutes);
app.use("/login", loginRoutes);
app.use("/relocacao", relocacaoRoutes);
app.use("/pedidos", pedidosRoutes);

// Definindo a porta 4000
app.listen(4000, () => {
  console.log("Servidor rodando na porta 4000");
});