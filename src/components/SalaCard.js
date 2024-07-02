// src/components/SalaCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SalaCard.css';

const SalaCard = ({ codigo, descricao, preco, periodo, localizacao }) => {
  const navigate = useNavigate();

  // Caminho da imagem com base no código da sala
  const imagePath = require(`../assets/images/salas/sala${codigo}/01.jpg`);

  // Função para redirecionar para a página de detalhes da sala
  const handleCardClick = () => {
    navigate(`/detalhes-sala/${codigo}`);
  };

  return (
    <div className="card" onClick={handleCardClick}>
      <div className="image-container">
        <img
          className="image"
          src={imagePath}
          alt={`Sala ${codigo}`}
        />
      </div>
      <div className="card-body">
        <h3>{descricao}</h3>
        <p>{preco} / {periodo}</p>
        <p>{localizacao}</p>
      </div>
    </div>
  );
};

export default SalaCard;
