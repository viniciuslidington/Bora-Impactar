import {
  listOfCategory,
  listOfUrgency,
  expirationMapping,
} from "../config/config.js";

//Funcao de validaçao de entrada tanto para solicitacoes(validateUrgency = true) quanto para repasses(validateUrgency = false)
export const validateData = (data, validateUrgency = false) => {
  const {
    id,
    title,
    category,
    urgency,
    description,
    quantity,
    ong_Id,
    ong_Nome,
    ong_Imagem,
    ong_Phone,
    ong_Email,
    expirationDuration,
  } = data;

  //if (id){ return "O id não pode ser passado manualmente"}

  if (!title || !category || !expirationDuration || !ong_Id || !ong_Nome) {
    return "Os campos Title, Category, expirationDuration, ong_Id e ong_Nome são obrigatórios";
  }

  if (validateUrgency && !urgency) {
    return "O campo Urgency é obrigatório";
  }

  if (typeof title !== "string" || title.length < 3) {
    return "O título deve ter pelo menos 3 caracteres e ser uma string";
  }

  if (!listOfCategory.includes(category)) {
    return "Categoria inválida.";
  }

  if (validateUrgency && !listOfUrgency.includes(urgency)) {
    return "Nível de urgência inválido. Escolha entre: LOW, MEDIUM, HIGH";
  }

  if (!expirationMapping[expirationDuration]) {
    return "Valor inválido para ExpirationDuration. Escolha entre: '7 dias', '2 semanas', '4 semanas', '12 semanas'.";
  }

  if (Number(ong_Id) < 1) {
    return "Ong_Id deve ser um número inteiro positivo";
  }

  if (typeof ong_Nome !== "string") {
    return "Ong_Nome deve ser uma string";
  }

  if (ong_Imagem && typeof ong_Imagem !== "string") {
    return "Ong_Imagem deve ser uma string";
  }

  if (ong_Phone && typeof ong_Phone !== "string") {
    return "Ong_Phone deve ser uma string";
  }

  if (ong_Email && typeof ong_Email !== "string") {
    return "ong_Email deve ser uma string";
  }

  if (description && typeof description !== "string") {
    return "A descrição deve ser uma string";
  }

  if (quantity && (typeof quantity !== "number" || quantity < 1)) {
    return "A quantidade deve ser um número inteiro positivo";
  }

  return null;
};

export const validatePartialUpdate = (data) => {
  const {
    title,
    category,
    ong_Email,
    ong_Phone,
    urgency,
    description,
    ong_Id,
    ong_Nome,
    ong_Imagem,
  } = data;

  if (title && (typeof title !== "string" || title.length < 3)) {
    return "O título deve ter pelo menos 3 caracteres e ser uma string";
  }

  if (category && !listOfCategory.includes(category)) {
    return "Categoria inválida.";
  }

  if (ong_Email && typeof ong_Email !== "string") {
    return "ong_Email deve ser uma string";
  }

  if (ong_Phone && typeof ong_Phone !== "string") {
    return "Ong_Phone deve ser uma string";
  }

  if (urgency && !listOfUrgency.includes(urgency)) {
    return "Nível de urgência inválido. Escolha entre: LOW, MEDIUM, HIGH";
  }

  if (description && typeof description !== "string") {
    return "A descrição deve ser uma string";
  }

  if (ong_Id) {
    return "Ong_Id não pode ser editado";
  }

  if (ong_Nome) {
    return "ong_Nome não pode ser editado";
  }

  if (ong_Imagem) {
    return "ong_Imagem não pode ser editado";
  }

  return null;
};
