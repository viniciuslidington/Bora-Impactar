import cron from "node-cron";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//Função para apagar postagens expiradas
const cleanupExpiredPosts = async () => {
  const data = new Date();
  const dataFormatada = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(data); //Formatando data para registrar no log
  console.log(`[${dataFormatada}] Executando tarefa de cleanup...`);

  try {
    const now = new Date();

    //Apaga as solicitações cuja data de expiração já passou
    const deletedSolicitacao = await prisma.request.deleteMany({
      where: { expirationDate: { lt: now } }, //Menor que a data/hora atual
    });
    console.log(`Solicitações expiradas apagadas: ${deletedSolicitacao.count}`);

    //Apaga os repasses cuja data de expiração já passou
    const deletedRepasse = await prisma.relocationProduct.deleteMany({
      where: { expirationDate: { lt: now } }, //Menor que a data/hora atual
    });
    console.log(`Repasses expirados apagados: ${deletedRepasse.count}`);
  } catch (err) {
    console.error("Erro ao apagar posts expirados:", err);
  }
};

//Verificação simples pra certificar que o cron so vai criar apenas um agendamento
let cronStarted = false;
//Isso só funciona caso não escale o servidor para multiplos containers. Se for o caso, o ideal é criar um container apenas para o cron. Assim evitando multiplas instancias
if (!cronStarted) {
  //Tarefa agendada pra rodar diariamente à meia noite ou 21h dependendo da timezone do ambiente
  console.log("Iniciando agendador do cleanupExpiredPosts.js...");
  cron.schedule("0 0 * * *", cleanupExpiredPosts);
  cronStarted = true;
}
