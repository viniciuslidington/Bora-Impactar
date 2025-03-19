import { spawn } from "child_process";

const services = ["services/data.js", "services/login.js", "services/pedidos.js", "services/relocacao.js"];

services.forEach((service) => {
  const proc = spawn("node", [service], { stdio: "inherit" });

  proc.on("close", (code) => {
    console.log(`Processo ${service} finalizou com código ${code}`);
  });
});