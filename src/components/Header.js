import React from 'react';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">Medical Clinic</div>
      <div className="search">
        <input type="text" placeholder="Onde você quer atender ?" />
      </div>
      <div className="login">
        <button>Entrar</button>
      </div>
    </header>
  );
};

export default Header;
