import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../styles/EscolhaHorario.css';

// Definindo os horários de manhã
const horariosManha = [
  "08:00 - 09:00",
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00"
];

// Definindo os horários de tarde
const horariosTarde = [
  "12:00 - 13:00",
  "13:00 - 14:00",
  "14:00 - 15:00",
  "15:00 - 16:00",
  "16:00 - 17:00",
  "17:00 - 18:00"
];

// Definindo os horários de noite
const horariosNoite = [
  "18:00 - 19:00",
  "19:00 - 20:00",
  "20:00 - 21:00"
];

const EscolhaHorario = ({ show, handleClose, selectedDate }) => {
  const [selectedHorarios, setSelectedHorarios] = useState([]);

  // Função para alternar a seleção dos horários
  const toggleHorario = (horario) => {
    setSelectedHorarios((prev) => 
      prev.includes(horario) 
        ? prev.filter(h => h !== horario) 
        : [...prev, horario]
    );
  };

  // Função para lidar com a ação de reservar
  const handleReservar = () => {
    console.log(`Reservado para ${selectedDate.toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}:`, selectedHorarios);
    handleClose();
  };

  // Função para formatar a data selecionada
  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('pt-BR', options);
  };

  return (
    <Modal show={show} onHide={handleClose} dialogClassName="escolha-horario-modal modal-centered modal-lg">
      <Modal.Header className="modal-header">
        {/* Título do modal */}
        <Modal.Title className="modal-title-custom">Escolha horários para</Modal.Title>
        {/* Subtítulo com a data formatada */}
        <div className="modal-subtitle">{formatDate(selectedDate)}</div>
      </Modal.Header>
      <Modal.Body>
        {/* Seção de horários da manhã */}
        <div className="horarios-secao">
          <h5>Manhã</h5>
          <div className="horarios-container">
            {horariosManha.map(horario => (
              <Button
                key={horario}
                variant={selectedHorarios.includes(horario) ? "primary" : "outline-primary"}
                onClick={() => toggleHorario(horario)}
                className="horario-button"
              >
                {horario}
              </Button>
            ))}
          </div>
        </div>
        {/* Seção de horários da tarde */}
        <div className="horarios-secao">
          <h5>Tarde</h5>
          <div className="horarios-container">
            {horariosTarde.map(horario => (
              <Button
                key={horario}
                variant={selectedHorarios.includes(horario) ? "primary" : "outline-primary"}
                onClick={() => toggleHorario(horario)}
                className="horario-button"
              >
                {horario}
              </Button>
            ))}
          </div>
        </div>
        {/* Seção de horários da noite */}
        <div className="horarios-secao">
          <h5>Noite</h5>
          <div className="horarios-container">
            {horariosNoite.map(horario => (
              <Button
                key={horario}
                variant={selectedHorarios.includes(horario) ? "primary" : "outline-primary"}
                onClick={() => toggleHorario(horario)}
                className="horario-button"
              >
                {horario}
              </Button>
            ))}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {/* Botões de ação */}
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleReservar}>
          Reservar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EscolhaHorario;
