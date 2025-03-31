import axios from "axios";

const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY; // Usando variável de ambiente

const fetchImages = async (searchTerm) => {
  if (!searchTerm.trim()) return [];
  const response = await axios.get("https://api.pexels.com/v1/search", {
    params: {
      query: searchTerm,
      per_page: 24,
      locale: "pt-BR",
    },
    headers: { Authorization: PEXELS_API_KEY },
  });

  return response.data.photos;
};

const getPexelsImageAsFile = async (imageUrl) => {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob(); // Converte a imagem em um Blob

    // Criando um arquivo a partir do Blob
    const file = new File([blob], "pexels-image.jpg", { type: blob.type });

    return file;
  } catch (error) {
    console.error("Erro ao baixar a imagem do Pexels:", error);
    return null;
  }
};

export { fetchImages, getPexelsImageAsFile };
