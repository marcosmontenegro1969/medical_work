// src/pages/Home.js
import React, { useState } from 'react';
import '../styles/Home.css';
import SearchForm from '../components/SearchForm';
import Carousel from '../components/Carousel';
import Howtorent from '../components/Howtorent';
import HowItWorks from '../components/HowItWorks'; // Importar o novo componente

const Home = () => {
  const [selectedTipo, setSelectedTipo] = useState('Odontologia');

  return (
    <div className="home">
      <div className="hero-image">
        <div className="search-form-container">
          <SearchForm />
        </div>
        <div className="links">
          <a href="#rent">Alugar Consultório</a>
          <a href="#advertise">Anunciar Consultório</a>
          <a href="#rent-equipment">Alugar Equipamento</a>
        </div>
      </div>
      <div className="especialidades">
        <h2>Tipos de consultório</h2>
        <div className="especialidades-links">
          {['Odontologia', 'Medico', 'Psicologia', 'Fisioterapia', 'Fonoaudiologia', 'Nutrição'].map((tipo) => (
            <button key={tipo} onClick={() => setSelectedTipo(tipo)}>
              {tipo}
            </button>
          ))}
        </div>
      </div>
      <Carousel tipo={selectedTipo} />
      <Howtorent /> {/* Incluindo o componente HowToRent */}
      <HowItWorks /> {/* Incluindo o componente HowItWorks */}
    </div>
  );
};

export default Home;
