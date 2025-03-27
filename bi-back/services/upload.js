import express from 'express';
import multer from 'multer';
import cloudinary from '../config/cloudinaryConfig.js';

const router = express.Router();

// Configuração do Multer para armazenar em memória
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Endpoint para upload de imagem compactada
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Nenhum arquivo enviado' });
    }

    // Configurações de compactação no Cloudinary (sem pasta)
    const uploadOptions = {
      format: 'webp',         // Converte para WebP (melhor compactação)
      quality: 'auto:low',    // Reduz qualidade automaticamente
      transformation: [
        { width: 800, height: 800, crop: 'limit' } // Redimensiona se for muito grande
      ],
      resource_type: 'auto'   // Detecta o tipo do arquivo
    };

    // Fazendo o upload para o Cloudinary
    cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
      if (error) {
        return res.status(500).json({ error: 'Erro no upload para o Cloudinary' });
      }
      res.status(200).json({
        message: 'Upload bem-sucedido!',
        url: result.secure_url,
        public_id: result.public_id
      });
    }).end(req.file.buffer); // Envia o arquivo para o Cloudinary

    console.log(req.file.buffer);

  } catch (error) {
    console.error('Erro inesperado:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const { resources } = await cloudinary.search
      .expression('resource_type:image') // Filtra apenas imagens
      .sort_by('created_at', 'desc')
      .max_results(20) // Retorna no máximo 20 imagens
      .execute();

    const images = resources.map(img => ({
      url: img.secure_url,
      public_id: img.public_id
    }));

    res.json(images);
  } catch (error) {
    console.error('Erro ao buscar imagens:', error);
    res.status(500).json({ error: error.message });
  }
});

// 📌 [GET] - Obter detalhes de uma imagem específica
router.get('/:public_id', async (req, res) => {
  try {
    const { public_id } = req.params;
    const result = await cloudinary.api.resource(public_id);

    res.json({
      url: result.secure_url,
      format: result.format,
      width: result.width,
      height: result.height,
      created_at: result.created_at
    });
  } catch (error) {
    console.error('Erro ao obter imagem:', error);
    res.status(404).json({ error: 'Imagem não encontrada' });
  }
});

// 📌 [DELETE] - Remover uma imagem pelo public_id
router.delete('/:public_id', async (req, res) => {
  try {
    const { public_id } = req.params;

    const result = await cloudinary.uploader.destroy(public_id);
    
    if (result.result !== 'ok') {
      return res.status(400).json({ error: 'Erro ao excluir a imagem' });
    }

    res.json({ message: 'Imagem excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir imagem:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
