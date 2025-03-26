import express from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinaryConfig.js';

const router = express.Router();
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'uploads', // Pasta no Cloudinary
    format: async () => 'webp', // Converte para WebP automaticamente
    transformation: [{ quality: 'auto:low' }], // Compactação automática
  },
});
const upload = multer({ storage });

// Endpoint para upload de imagem com compactação para WebP
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Nenhum arquivo enviado' });
    }

    // Limite de tamanho do arquivo (5MB)
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    if (req.file.size > MAX_FILE_SIZE) {
      return res.status(400).json({ error: 'O arquivo excede o limite de 5MB' });
    }

    // Configurações do upload para Cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'uploads', // Pasta no Cloudinary
        format: 'webp', // Converte para WebP
        quality: 'auto:low', // Compactação automática
        resource_type: 'auto', // Detecta o tipo do arquivo automaticamente
      },
      (error, result) => {
        if (error) {
          return res.status(500).json({ error: error.message });
        }
        res.status(200).json({
          message: 'Upload bem-sucedido!',
          url: result.secure_url, // URL da imagem otimizada
        });
      }
    );

    // Envia a imagem para o Cloudinary
    uploadStream.end(req.file.buffer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
