// src/components/LoginSocial.js
import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaFacebook, FaLinkedin } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc'; // Importando ícone do Google com as cores oficiais
import '../styles/LoginSocial.css';
import InputLogin from './InputLogin'; // Importando o componente InputLogin

const LoginSocial = ({ onClose }) => {
  return (
    <Modal show onHide={onClose} className="login-social-modal">
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
        <h2>Entrar</h2>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <InputLogin
              type="email"
              name="email"
              label="E-mail"
              placeholder="Digite seu e-mail"
              className="input-email"
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100 my-3">
            Entrar
          </Button>
        </Form>
        <div className="text-center my-3">ou</div>
        <Button variant="outline-primary" className="w-100 my-2 social-button">
          <FcGoogle className="social-icon" /> Continuar com Google
        </Button>
        <Button variant="outline-primary" className="w-100 my-2 social-button facebook">
          <FaFacebook className="social-icon" /> Continuar com Facebook
        </Button>
        <Button variant="outline-primary" className="w-100 my-2 social-button linkedin">
          <FaLinkedin className="social-icon" /> Continuar com LinkedIn
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default LoginSocial;
