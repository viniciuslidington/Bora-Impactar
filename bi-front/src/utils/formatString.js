// Função auxiliar para normalizar e remover acentos
function formatarString(str) {
  return str
    .toLowerCase() // Formata a string para minúsculo
    .normalize("NFD") // Normaliza a string
    .replace(/[\u0300-\u036f]/g, ""); // Remove a acentuação
}

export { formatarString };
