import React, { useEffect } from 'react';
import '../styles/Anunciar.css';
import InputLogin from '../components/InputLogin'; // Importando o componente InputLogin

const Anunciar = ({ onClose }) => {
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

  return (
    <>
      <div className="overlay" onClick={onClose}></div>
      <div className="anunciar">
        <h2>Anunciar Consultório</h2>
        <p className="message">Preencha abaixo as informações básicas de sua sala. Nossa equipe entrará em contato para finalização de seu anúncio.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // Lógica para envio do formulário
          }}
        >
          <div className="form-row">
            <InputLogin
              type="text"
              name="nomeProprietario"
              label="Nome do Proprietário"
              value=""
              onChange={() => {}}
              size="third-width"
            />
            <InputLogin
              type="tel"
              name="telefoneProprietario"
              label="Telefone do Proprietário"
              value=""
              onChange={() => {}}
              size="third-width"
            />
            <InputLogin
              type="text"
              name="especialidade"
              label="Especialidade da sala"
              value=""
              onChange={() => {}}
              size="third-width"
            />
          </div>
          <InputLogin
            type="text"
            name="endereco"
            label="Endereço Completo"
            value=""
            onChange={() => {}}
            size="full-width"
          />
          <InputLogin
            type="text"
            name="descricao"
            label="Descrição da Sala"
            value=""
            onChange={() => {}}
            size="full-width"
          />
          <InputLogin
            type="text"
            name="equipamentos"
            label="Equipamentos na Sala"
            value=""
            onChange={() => {}}
            size="full-width"
          />
          <InputLogin
            type="text"
            name="disponibilidade"
            label="Dias/horários de disponibilidade"
            value=""
            onChange={() => {}}
            size="full-width"
          />
          <div className="form-group full-width">
            <label htmlFor="fotos">Fotos (mínimo 4, máximo 8)</label>
            <input type="file" id="fotos" name="fotos" multiple accept="image/*" required />
          </div>
          <div className="button-group">
            <button type="submit">Enviar</button>
            <button type="button" onClick={onClose}>Voltar</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Anunciar;
