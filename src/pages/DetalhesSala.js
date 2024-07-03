// Importando bibliotecas e componentes necessários
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/DetalhesSala.css';
import salas from '../components/salas';
import Map from '../components/Map';
import EscolhaHorario from '../components/EscolhaHorario';

// Função para importar todas as imagens de um diretório específico
const importAll = (context) => {
  let images = {};
  context.keys().forEach((item) => {
    images[item.replace('./', '')] = context(item);
  });
  return images;
};

// Importando todas as imagens das salas
const images = importAll(require.context('../assets/images/salas', true, /\.(png|jpe?g|svg)$/));

const DetalhesSala = () => {
  const { codigo } = useParams(); // Obtendo o código da sala a partir dos parâmetros da URL
  const sala = salas.find(salaAtual => salaAtual.codigo === codigo); // Encontrando a sala correspondente ao código
  const [selectedDate, setSelectedDate] = useState(new Date()); // Estado para a data selecionada no calendário
  const [showModal, setShowModal] = useState(false); // Estado para controlar a exibição do modal de escolha de horário
  const calendarRef = useRef(null); // Referência para o elemento do calendário

  // Efeito para rolar a página para o topo ao carregar o componente
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Função para abrir o WhatsApp com uma mensagem predefinida
  const openWhatsApp = () => {
    const phoneNumber = "55DDD81992348080";
    const message = "Olá, desejo agendar uma visita para conhecer: " + sala.descricao;
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  // Verificação se a sala existe, caso contrário, exibe uma mensagem de erro
  if (!sala) {
    return <div>Sala não encontrada</div>;
  }

  // Função para lidar com a mudança de data no calendário
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowModal(true);
  };

  // Função para rolar a página até o calendário ao clicar no botão de reservar
  const handleReservarClick = () => {
    if (calendarRef.current) {
      calendarRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const now = new Date(); // Data atual

  // Mapeamento dos dias da semana para abreviações em português
  const diasDaSemana = {
    Sunday: "Dom",
    Monday: "Seg",
    Tuesday: "Ter",
    Wednesday: "Qua",
    Thursday: "Qui",
    Friday: "Sex",
    Saturday: "Sáb"
  };

  return (
    <div className="detalhes-sala">
      {/* Carrossel de imagens da sala */}
      <div className="carrossel">
        <Carousel>
          {sala.imagens.map((imagem, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100"
                src={images[`sala${codigo}/${imagem}`]}
                alt={`Sala ${codigo} - Imagem ${index + 1}`}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      {/* Informações principais da sala */}
      <div className="informacoes-principais">
        <h4>{sala.descricao}</h4>
        <p>Consultório {sala.tipo}</p>
        <p>{sala.localizacao}</p>
      </div>

      {/* Descrição detalhada da sala */}
      <div className="descricao">
        <h5>Descrição</h5>
        <p>{sala.descricao}</p>
      </div>

      {/* Regras para uso da sala */}
      <div className="regras">
        <h5>Regras</h5>
        <p>Regras para uso da Sala {sala.codigo}</p>
      </div>

      {/* Comodidades oferecidas pela sala */}
      <div className="comodidades">
        <h5>Comodidades</h5>
        <ul>
          <li>Wi-Fi</li>
          <li>Ar condicionado</li>
          <li>TV</li>
        </ul>
      </div>

      {/* Equipamentos disponíveis na sala */}
      <div className="equipamentos">
        <h5>Equipamentos e Instrumentais</h5>
        <ul>
          <li>Maca</li>
          <li>Computador</li>
          <li>Impressora</li>
        </ul>
      </div>

      {/* Comodidades de segurança oferecidas pela sala */}
      <div className="seguranca">
        <h5>Comodidades de Segurança</h5>
        <ul>
          <li>Câmeras de segurança</li>
          <li>Portaria 24h</li>
        </ul>
      </div>

      {/* Oferta especial para reservas prolongadas */}
      <div className="oferta-especial">
        <h5>Oferta Especial</h5>
        <p>Desconto para reservas acima de 5 horas</p>
      </div>

      {/* Seção de reserva com calendário */}
      <div className="reserva" ref={calendarRef}>
        <h5>Reserva</h5>
        <p>Escolha uma data para visualizar os horários disponíveis para reserva:</p>
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          tileClassName={({ date, view }) => {
            if (view === 'month' && date.getDay() === 0) {
              return 'react-calendar__tile--indisponivel';
            }
            return '';
          }}
          minDate={now}
          formatShortWeekday={(locale, date) => diasDaSemana[date.toLocaleDateString('en-US', { weekday: 'long' })]}
        />
      </div>

      {/* Seção de localização com mapa */}
      <div className="localizacao">
        <h5>Localização</h5>
        <Map latitude={sala.latitude} longitude={sala.longitude} />
      </div>

      {/* Seção de pontuação da sala */}
      <div className="pontuacao">
        <h5>Pontuação</h5>
        <div className="pontuacao-header">
          <span className="estrela">⭐</span>
          <span>5.00</span>
        </div>
        <div className="pontuacao-body">
          <div className="pontuacao-item">
            <span>Pontualidade</span>
            <span>5.0</span>
          </div>
          <div className="pontuacao-item">
            <span>Valor</span>
            <span>4.0</span>
          </div>
          <div className="pontuacao-item">
            <span>Estrutura</span>
            <span>5.0</span>
          </div>
          <div className="pontuacao-item">
            <span>Limpeza</span>
            <span>5.0</span>
          </div>
          <div className="pontuacao-item">
            <span>Comunicação</span>
            <span>5.0</span>
          </div>
          <div className="pontuacao-item">
            <span>Avaliação Geral</span>
            <span>5.0</span>
          </div>
        </div>
      </div>

      {/* Seção de informações do proprietário */}
      <div className="proprietario">
        <h5>Proprietário</h5>
        <p>Dr. Exemplo</p>
        <p>Desde Janeiro de 2023</p>
        <a href={`https://wa.me/5511999999999`} target="_blank" rel="noopener noreferrer">Falar com Dr. Exemplo</a>
      </div>

      {/* Footer fixo com opções de reserva e agendamento de visita */}
      <div className="footer-fixo">
        <div className="preco-periodo">
          <p>{sala.preco} / {sala.periodo}</p>
        </div>
        <div className="botoes">
          <button onClick={handleReservarClick}>Reservar</button>
          <button onClick={openWhatsApp}>Agendar Visita</button>
        </div>
      </div>

      {/* Componente de escolha de horário, exibido como modal */}
      <EscolhaHorario
        show={showModal}
        handleClose={() => setShowModal(false)}
        selectedDate={selectedDate}
      />
    </div>
  );
};

export default DetalhesSala;
