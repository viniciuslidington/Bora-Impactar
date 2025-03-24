function formatarData(data) {
  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0"); // Janeiro é 0!
  const ano = String(data.getFullYear()).slice(-2); // Pega os últimos 2 dígitos do ano
  return `${dia}/${mes}/${ano}`;
}

function calcularTempoRestante(dataExpiracao) {
  const dataAtual = new Date();
  const diferencaEmMilissegundos = dataExpiracao - dataAtual;
  const umDia = 24 * 60 * 60 * 1000; // Milissegundos em um dia
  const umaHora = 60 * 60 * 1000; // Milissegundos em uma hora

  if (diferencaEmMilissegundos < 0) {
    return "Postagem Expirada"; //Se passou da data de expiração
  }

  const diasRestantes = Math.floor(diferencaEmMilissegundos / umDia);
  const horasRestantes = Math.floor(
    (diferencaEmMilissegundos % umDia) / umaHora,
  );

  let resposta = null;
  if (diasRestantes > 0) {
    resposta = `${diasRestantes} dias restantes`;
  } else if (horasRestantes > 0) {
    resposta = `${horasRestantes} horas restantes`;
  } else {
    resposta = "1 hora restante";
  }

  return resposta;
}

function calcularTempoDesdePublicacao(dataPublicacao) {
  const dataAtual = new Date();
  const diferencaEmMilissegundos = dataAtual - new Date(dataPublicacao);
  const umDia = 24 * 60 * 60 * 1000;
  const umaHora = 60 * 60 * 1000;
  const umMinuto = 60 * 1000;

  if (diferencaEmMilissegundos < 0) return "Data inválida";

  const dias = Math.floor(diferencaEmMilissegundos / umDia);
  const horas = Math.floor((diferencaEmMilissegundos % umDia) / umaHora);
  const minutos = Math.floor((diferencaEmMilissegundos % umaHora) / umMinuto);

  if (dias > 0) return `${dias}d`;
  if (horas > 0) return `${horas}h`;
  if (minutos > 0) return `${minutos}min`;
  return "Agora";
}

export { formatarData, calcularTempoRestante, calcularTempoDesdePublicacao };
