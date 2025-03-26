import { useState } from 'react';
import axios from 'axios';

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false); // Estado de carregamento
  
  const PEXELS_API_KEY = 'UCsDoHiKIjt2dcoPHUrW5EXdLx28KB9vMOcorJso6GLeVLYPMwSCaitx' // 🔑 Chave da API via .env

  // Seleciona um arquivo local
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImageUrl('');
    }
  };

  // Busca imagens no Pexels
  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setLoading(true); // Inicia o carregamento
    try {
      const response = await axios.get('https://api.pexels.com/v1/search', {
        params: { query: searchTerm, per_page: 6 },
        headers: { Authorization: PEXELS_API_KEY },
      });
      setSearchResults(response.data.photos);
    } catch (error) {
      console.error('Erro ao buscar imagens:', error);
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  // Seleciona uma imagem da web
  const handleImageSelect = (url) => {
    setImageUrl(url);
    setImage(null);
  };

  // Faz o upload da imagem (local ou web)
  const handleUpload = async () => {
    if (!image && !imageUrl) return;

    try {
      if (image) {
        const formData = new FormData();
        formData.append('image', image);

        const response = await axios.post('http://localhost:3000/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        alert('Upload realizado com sucesso!');
        console.log('URL da imagem:', response.data.url);
      } else {
        alert(`Imagem da web selecionada: ${imageUrl}`);
        console.log('Imagem da web selecionada:', imageUrl);
      }
    } catch (error) {
      console.error('Erro no upload:', error);
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload de Imagem</h2>

      {/* Upload local */}
      <label className="file-input">
        Escolher arquivo
        <input type="file" onChange={handleFileChange} />
      </label>

      <hr />

      {/* Barra de pesquisa para buscar imagens no Pexels */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Pesquisar imagem..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </div>

      {/* Exibir resultados da pesquisa no Pexels */}
      <div className="image-grid">
        {searchResults.map((img) => (
          <img
            key={img.id}
            src={img.src.small}
            alt={img.alt}
            className={`search-image ${imageUrl === img.src.large ? 'selected' : ''}`}
            onClick={() => handleImageSelect(img.src.large)}
          />
        ))}
      </div>

      {/* Exibir a imagem selecionada */}
      {imageUrl && (
        <div className="selected-image-container">
          <h3>Imagem Selecionada:</h3>
          <img src={imageUrl} alt="Selecionada" className="selected-image" />
        </div>
      )}

      <button onClick={handleUpload} className="upload-button" disabled={!image && !imageUrl}>
        Fazer Upload
      </button>
    </div>
  );
};

export default UploadImage;
