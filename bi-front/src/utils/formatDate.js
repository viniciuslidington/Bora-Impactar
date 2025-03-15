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
    (diferencaEmMilissegundos % umDia) / umaHora
  );

  let resposta = null;
  if (horasRestantes !== 0 && diasRestantes !== 0) {
    resposta = `Tempo restante: ${diasRestantes} dias e ${horasRestantes} horas`;
  } else if (horasRestantes === 0 && diasRestantes !== 0) {
    resposta = `Tempo restante: ${diasRestantes} dias`;
  } else if (horasRestantes !== 0 && diasRestantes === 0) {
    resposta = `Tempo restante: ${horasRestantes} horas`;
  } else {
    resposta = "Menos de 1 hora restante";
  }

  return resposta;
}

export { formatarData, calcularTempoRestante };
