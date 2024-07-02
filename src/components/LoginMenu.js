// src/components/LoginMenu.js
import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { FaBullhorn, FaSearch, FaWhatsapp, FaQuestionCircle } from 'react-icons/fa';
import '../styles/LoginMenu.css';

const LoginMenu = () => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Entrar
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/login">Entrar</Dropdown.Item>
        <Dropdown.Item href="#/register">Cadastrar-se</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item href="#/announce">
          <FaBullhorn /> Quero anunciar
        </Dropdown.Item>
        <Dropdown.Item href="#/rent">
          <FaSearch /> Quero alugar
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
  );
};

export default LoginMenu;
