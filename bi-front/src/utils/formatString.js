// Função auxiliar para normalizar e remover acentos
function formatarString(str) {
  return str
    .toLowerCase() // Formata a string para minúsculo
    .normalize("NFD") // Normaliza a string
    .replace(/[\u0300-\u036f]/g, ""); // Remove a acentuação
}
function formatarString2(str) {
  return str
    .toUpperCase() // Formata a string para minúsculo
    .normalize("NFD") // Normaliza a string
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "_"); // Remove todos os espaços; // Remove a acentuação
}
function formatarString3(str) {
  return str
    .toUpperCase() // Formata a string para minúsculo
    .normalize("NFD") // Normaliza a string
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "+"); // Remove todos os espaços; // Remove a acentuação
}

function formatarNumeroTelefone(numero) {
  // Remove todos os caracteres que não são números
  let numerosLimpos = numero.replace(/\D/g, "");

  // Se for um número de celular (11 dígitos), formata como (99) 99999-9999
  if (numerosLimpos.length === 11) {
    return numerosLimpos.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  }

  // Se for um número fixo (10 dígitos), formata como (99) 9999-9999
  return numerosLimpos.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
}

export {
  formatarString,
  formatarString2,
  formatarString3,
  formatarNumeroTelefone,
};
