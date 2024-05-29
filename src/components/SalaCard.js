import React from 'react';
import '../styles/SalaCard.css';

const SalaCard = ({ codigo, descricao, preco, periodo, localizacao }) => {
  // Caminho da imagem com base no código da sala
  const imagePath = require(`../assets/images/salas/sala${codigo}/01.jpg`);

  return (
    <div className="card">
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
