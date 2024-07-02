import React, { useState } from 'react';
import '../styles/Home.css';
import SearchForm from '../components/SearchForm';
import Carousel from '../components/Carousel';
import Howtorent from '../components/Howtorent';
import HowItWorks from '../components/HowItWorks';
import { Link } from 'react-router-dom';

const Home = ({ handleAnunciarClick }) => {
  const [selectedTipo, setSelectedTipo] = useState('Odontologia');

  return (
    <div className="home">
      <div className="hero-image">
        <div className="search-form-container">
          <SearchForm />
        </div>
        <div className="links">
          <Link to="#" onClick={handleAnunciarClick}>Anuncie aqui seu Consultório</Link>
          {/* <Link to="/alugar">Alugar Consultório</Link> */}
          {/* <Link to="/alugar-equipamento">Alugar Equipamento</Link> */}
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
      <Howtorent />
      <HowItWorks />
    </div>
  );
};

export default Home;
