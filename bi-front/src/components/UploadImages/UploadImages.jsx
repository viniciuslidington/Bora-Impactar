import { useState } from 'react';
import axios from 'axios';

const PEXELS_API_KEY = 'UCsDoHiKIjt2dcoPHUrW5EXdLx28KB9vMOcorJso6GLeVLYPMwSCaitx'; // 🔑 Insira sua chave da API

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Lida com o upload de arquivo local
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImageUrl('');
  };

  // Lida com a busca de imagens no Pexels
  const handleSearch = async () => {
    if (!searchTerm) return;
    
    try {
      const response = await axios.get(`https://api.pexels.com/v1/search`, {
        params: { query: searchTerm, per_page: 6 },
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      });
      setSearchResults(response.data.photos);
    } catch (error) {
      console.error("Erro ao buscar imagens:", error);
    }
  };

  // Seleciona uma imagem da web
  const handleImageSelect = (url) => {
    setImageUrl(url);
    setImage(null);
  };

  // Faz o upload da imagem selecionada
  const handleUpload = async () => {
    if (!image && !imageUrl) {
      alert("Selecione uma imagem primeiro!");
      return;
    }

    if (image) {
      const formData = new FormData();
      formData.append('image', image);

      try {
        const response = await axios.post('http://localhost:5000/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert("Upload realizado com sucesso!");
        console.log("URL da imagem:", response.data.url);
      } catch (error) {
        console.error("Erro no upload:", error);
      }
    } else {
      alert("Imagem da web selecionada: " + imageUrl);
      console.log("Imagem da web selecionada:", imageUrl);
    }
  };

  return (
    <div>
      <h2>Upload de Imagem</h2>

      {/* Upload de arquivo local */}
      <input type="file" onChange={handleFileChange} />
      
      <hr />

      {/* Campo de pesquisa e botão */}
      <div>
        <input 
          type="text" 
          placeholder="Pesquisar imagem na web..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>

      {/* Exibir imagens da web */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '10px' }}>
        {searchResults.map((img) => (
          <img 
            key={img.id} 
            src={img.src.small} 
            alt={img.photographer} 
            style={{ width: '100px', height: '100px', cursor: 'pointer' }} 
            onClick={() => handleImageSelect(img.src.medium)}
          />
        ))}
      </div>

      {/* Exibir a imagem selecionada */}
      {imageUrl && (
        <div>
          <h3>Imagem Selecionada:</h3>
          <img src={imageUrl} alt="Selecionada" style={{ width: '300px' }} />
        </div>
      )}

      <button onClick={handleUpload} style={{ marginTop: '10px' }}>Fazer Upload</button>
    </div>
  );
};

export default UploadImage;
