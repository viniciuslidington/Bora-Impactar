import express from 'express';
import multer from 'multer';
import cloudinary from '../config/cloudinaryConfig.js';

const router = express.Router();
const storage = multer.memoryStorage(); // Usando memória para o upload
const upload = multer({ storage });

// Endpoint para upload de imagem
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }

    // Limite de tamanho do arquivo em bytes (exemplo: 5MB)
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    if (req.file.size > MAX_FILE_SIZE) {
      return res.status(400).send('File size exceeds the 5MB limit');
    }

    // Fazendo o upload para o Cloudinary
    const result = await cloudinary.uploader.upload_stream(
      { resource_type: 'auto' }, // 'auto' detecta o tipo do arquivo
      (error, result) => {
        if (error) {
          return res.status(500).send(error.message);
        }
        res.status(200).json({
          message: 'Upload successful',
          url: result.secure_url, // URL da imagem no Cloudinary
        });
      }
    );

    // Envia o arquivo para o Cloudinary
    result.end(req.file.buffer);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;
