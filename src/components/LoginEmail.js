import React, { useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import '../styles/LoginEmail.css';
import InputLogin from './InputLogin';

const LoginEmail = ({ onClose }) => {
  // Adiciona o listener de tecla "Esc"
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    // Limpa o listener ao desmontar o componente
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const handleForgotPassword = () => {
    // Lógica para "Esqueci minha senha"
    console.log("Esqueci minha senha");
  };

  return (
    <Modal show onHide={onClose} dialogClassName="login-email-modal">
      <Modal.Body>
        <h2>Entrar</h2>
        <Form>
          <div className="inputs-group">
            <InputLogin
              type="email"
              name="email"
              label="E-mail"
              placeholder="Digite seu e-mail"
              className="input-email"
            />
            <InputLogin
              type="password"
              name="password"
              label="Senha"
              placeholder="Digite sua senha"
              className="input-senha"
            />
          </div>
          <button type="button" className="forgot-password" onClick={handleForgotPassword}>
            Esqueci minha senha
          </button>
          <div className="button-group">
            <Button variant="primary" type="submit" className="btn-entrar">
              Entrar
            </Button>
            <Button variant="secondary" onClick={onClose} className="btn-voltar">
              Voltar
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginEmail;
