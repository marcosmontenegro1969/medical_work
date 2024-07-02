// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import DetalhesSala from './pages/DetalhesSala';
import CadastroForm from './components/CadastroForm';
import Anunciar from './pages/Anunciar';
import './styles/App.css';

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [showAnunciar, setShowAnunciar] = useState(false);

  const handleLoginClick = () => {
    setShowForm(!showForm);
    if (!showForm) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleAnunciarClick = () => {
    setShowAnunciar(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleCloseAnunciar = () => {
    setShowAnunciar(false);
  };

  return (
    <div className="App">
      <Router>
        <Header handleLoginClick={handleLoginClick} handleAnunciarClick={handleAnunciarClick} />
        <Routes>
          <Route path="/" element={<Home handleAnunciarClick={handleAnunciarClick} />} />
          <Route path="/detalhes-sala/:codigo" element={<DetalhesSala />} />
          <Route path="/anunciar" element={<Anunciar onClose={handleCloseAnunciar} />} />
        </Routes>
        <Footer handleLoginClick={handleLoginClick} handleAnunciarClick={handleAnunciarClick} />
        {showForm && <CadastroForm onClose={handleCloseForm} />}
        {showAnunciar && <Anunciar onClose={handleCloseAnunciar} />}
      </Router>
    </div>
  );
};

export default App;
