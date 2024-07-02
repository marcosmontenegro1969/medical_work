import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ErrorModal = ({ show, handleClose, errorMessage }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      dialogClassName="custom-modal"
      style={{ zIndex: 1201 }} // Estilo inline para z-index forcando a rendericação prioritaria do ErrorModal
    >
      <Modal.Header closeButton>
        <Modal.Title>Erro</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{errorMessage}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ErrorModal;
