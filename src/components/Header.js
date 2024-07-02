// src/components/Header.js
import React, { useState } from 'react';
import '../styles/Header.css';
import LoginEmail from './LoginEmail';
import { Dropdown } from 'react-bootstrap';
import { FaAddressCard, FaDoorOpen,FaSearch, FaBullhorn, FaLaptopMedical, FaWhatsapp, FaQuestionCircle } from 'react-icons/fa';

const Header = ({ handleLoginClick, handleAnunciarClick }) => {
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginEmailClick = () => {
    setShowLogin(!showLogin);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  return (
    <header className="header">
      <div className="logo">Medical Clinic</div>
      <div className="search">
        <input type="text" placeholder="Onde você quer atender?" />
      </div>
      <div className="login">
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Entrar
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={handleLoginClick}>
              <FaAddressCard /> Cadastrar
            </Dropdown.Item>
            <Dropdown.Item onClick={handleLoginEmailClick}>
              <FaDoorOpen /> Entrar
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="#/rent">
              <FaSearch /> Quero alugar
            </Dropdown.Item>
            <Dropdown.Item onClick={handleAnunciarClick}>
              <FaBullhorn /> Quero anunciar
            </Dropdown.Item>
            <Dropdown.Item>
            <FaLaptopMedical /> Alugar Equipamento
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="#/contact">
              <FaWhatsapp /> Fale com a gente
            </Dropdown.Item>
            <Dropdown.Item href="#/help">
              <FaQuestionCircle /> Ajuda
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      {showLogin && <LoginEmail onClose={handleCloseLogin} />}
    </header>
  );
};

export default Header;
