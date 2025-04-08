//Config que ajuda a organizar o codigo

// Dict dos nomes, etc
const listOfCategory = [
  "ELETRODOMESTICOS_E_MOVEIS",
  "UTENSILIOS_GERAIS",
  "ROUPAS_E_CALCADOS",
  "SAUDE_E_HIGIENE",
  "MATERIAIS_EDUCATIVOS_E_CULTURAIS",
  "ITENS_DE_INCLUSAO_E_MOBILIDADE",
  "ELETRONICOS",
  "ITENS_PET",
  "OUTROS",
];

const expirationMapping = {
  "7 dias": 7,
  "2 semanas": 14,
  "4 semanas": 30,
  "12 semanas": 90,
};

const listOfUrgency = ["LOW", "MEDIUM", "HIGH"];

export { listOfCategory, expirationMapping, listOfUrgency };
