import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3007;

// Define o diretório de arquivos estáticos
const staticPath = path.join(__dirname, "dist");
app.use(express.static(staticPath));

// Redireciona apenas as rotas que não correspondem a arquivos estáticos para o index.html
app.get("*", (req, res) => {
  const requestedPath = path.join(staticPath, req.path);
  if (!requestedPath.startsWith(staticPath) || !path.extname(req.path)) {
    res.sendFile(path.join(staticPath, "index.html"));
  } else {
    res
      .status(404)
      .send(`Erro 404: O arquivo ou rota '${req.path}' não foi encontrado.`);
  }
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
