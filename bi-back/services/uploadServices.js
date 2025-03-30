import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dtarxynyl", // Substitua pelo seu Cloud Name
  api_key: "372716194346946", // Substitua pela sua API Key
  api_secret: "QD-PkF5gr6soBfoLLgLyTgYKP3A", // Substitua pelo seu API Secret
});

// Função para fazer upload de imagens para o Cloudinary
export const uploadImage = (imageBuffer) => {
  return new Promise((resolve, reject) => {
    // Usando o método upload diretamente com parâmetros
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "auto", // Detecta automaticamente o tipo do arquivo (imagem, vídeo, etc.)
          format: "webp", // Converte para WebP
          quality: "auto:low", // Qualidade otimizada
          transformation: [{ width: 800, height: 800, crop: "limit" }], // Limita o tamanho da imagem
        },
        (error, result) => {
          if (error) {
            console.error("Erro no upload:", error);
            reject(error); // Em caso de erro, rejeita a promessa
          } else {
            resolve(result); // Retorna o resultado do upload se for bem-sucedido
          }
        }
      )
      .end(imageBuffer); // Envia o conteúdo da imagem para o Cloudinary
  });
};

// Função para deletar uma imagem do Cloudinary pelo seu public_id
export const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId); // Deleta a imagem pelo public_id
    if (result.result !== "ok") {
      console.error("Erro ao excluir imagem:", result);
      return null; // Se o resultado não for 'ok', algo deu errado
    }
    return result; // Retorna o resultado da exclusão se for bem-sucedido
  } catch (error) {
    console.error("Erro inesperado ao deletar imagem:", error);
    return null; // Se ocorrer algum erro durante o processo, retorna null
  }
};
