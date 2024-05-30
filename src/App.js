// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
// import CadastroCliente from '../Descartados/CadastroCliente';
// import Login from './pages/Login';
// import AtualizaCliente from '../Descartados/AtualizaCliente';
// import UserRegistration from '../Descartados/UserRegistration';
import './styles/App.css';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/cadastro-cliente" element={<CadastroCliente />} /> */}
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/atualiza-cliente" element={<AtualizaCliente />} />
          <Route path="/cadastro-medico" element={<UserRegistration />} /> */}
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
