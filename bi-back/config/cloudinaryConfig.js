// cloudinaryConfig.js
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dtarxynyl', // Substitua pelo seu Cloud Name
  api_key: '372716194346946',       // Substitua pela sua API Key
  api_secret: 'QD-PkF5gr6soBfoLLgLyTgYKP3A'  // Substitua pelo seu API Secret
});

const uploadOptions = {
  format: 'webp',            // Converte para o formato WebP (melhor compactação)
  quality: 'auto:low',       // Reduz automaticamente a qualidade para economizar largura de banda
  transformation: [
    { width: 800, height: 800, crop: 'limit' }  // Limita o tamanho da imagem para 800x800px
  ],
  resource_type: 'auto',     // Detecta automaticamente o tipo do arquivo (imagem, vídeo, etc.)
};

export default{ cloudinary, uploadOptions };


