import React from 'react';
import '../styles/SearchForm.css';

const SearchForm = () => {
  return (
    <form className="search-form">
      <h1>Encontre o consultório ideal</h1>
      <select>
        <option value="" disabled selected>Qual tipo de consultório?</option>
        <option value="clinico_geral">CLINICO GERAL</option>
        <option value="psicologia">PSICOLOGIA</option>
        <option value="fisioterapia">FISIOTERAPIA</option>
        <option value="fonoaudiologia">FONOAUDIOLOGIA</option>
        <option value="nutricao">NUTRIÇÃO</option>
      </select>
      <input type="text" placeholder="Onde você quer atender?" />
      <button type="submit">Buscar Consultório</button>
    </form>
  );
};

export default SearchForm;
