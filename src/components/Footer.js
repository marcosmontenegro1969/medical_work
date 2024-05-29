import React from 'react';
import '../styles/Footer.css';
import { FaWhatsapp, FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="column">
        <h4>Medical Clinic</h4>
        <ul>
          <li><a href="#help">Ajuda</a></li>
          <li><a href="#policy">Políticas de uso</a></li>
          <li><a href="#support">Suporte</a></li>
          <li><a href="#careers">Trabalhe conosco</a></li>
          <li><a href="#blog">Blog</a></li>
        </ul>
      </div>
      <div className="column">
        <h4>Nossa Rede</h4>
        <ul>
          <li><a href="#rent">Quero Alugar</a></li>
          <li><a href="#advertise">Quero Anunciar</a></li>
          <li><a href="#register">Cadastre-se</a></li>
        </ul>
      </div>
      <div className="column">
        <h4>Conecte-se conosco</h4>
        <div className="social-icons">
          <a href="#whatsapp"><FaWhatsapp /></a>
          <a href="#facebook"><FaFacebook /></a>
          <a href="#instagram"><FaInstagram /></a>
          <a href="#linkedin"><FaLinkedin /></a>
          <a href="#twitter"><FaTwitter /></a>
          <a href="#youtube"><FaYoutube /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
