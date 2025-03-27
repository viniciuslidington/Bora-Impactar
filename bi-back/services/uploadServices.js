import cloudinary from '../config/cloudinaryConfig.js';
import uploadOptions from '../config/cloudinaryConfig.js';


export const uploadImage = async (imageBuffer) => {
  try {
    
    const result = await cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
      if (error) {
        console.error("Erro no upload:", error);
        return null;  // Se houver erro, retorna null
      }
      return result;  // Retorna o resultado do upload se for bem-sucedido
    });

    result.end(imageBuffer);  // Envia o conteúdo da imagem para o Cloudinary

    return result;
  } catch (error) {
    console.error("Erro inesperado ao fazer upload:", error);
    return null;  // Caso ocorra erro no upload, retorna null
  }
};


export const deleteImage = async (publicId) => {
    try {
      const result = await cloudinary.uploader.destroy(publicId);  // Deleta a imagem pelo public_id
      if (result.result !== 'ok') {
        console.error("Erro ao excluir imagem:", result);
        return null;  // Se o resultado não for 'ok', algo deu errado
      }
      return result;  // Retorna o resultado da exclusão se for bem-sucedido
    } catch (error) {
      console.error("Erro inesperado ao deletar imagem:", error);
      return null;  // Se ocorrer algum erro durante o processo, retorna null
    }
  };
  