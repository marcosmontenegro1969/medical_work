import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import step01 from '../assets/images/step01.png';
import step02 from '../assets/images/step02.png';
import step03 from '../assets/images/step03.png';
import step04 from '../assets/images/step04.png';
import step05 from '../assets/images/step05.png';
import '../styles/Howtorent.css';

const Howtorent = () => {
  const stepDescriptions = [
    'Use os filtros e encontre o espaço ideal para você',
    'Defina a data e o período que deseja alugar',
    'Faça seu cadastro',
    'Escolha a forma de pagamento',
    'Clique em finalizar. Prontinho!'
  ];

  const stepImages = [step01, step02, step03, step04, step05];

  return (
    <div className="how-to-rent">
      <div className="steps">
        <h2>É muito simples <span>alugar</span></h2>
        <div className="step-items">
          {stepDescriptions.map((desc, index) => (
            <figure className="step-item" key={index}>
              <img 
                src={stepImages[index]} 
                alt={`Step ${index + 1}`} 
                className="step-icon" 
              />
              <figcaption>{desc}</figcaption>
            </figure>
          ))}
        </div>
      </div>
      <div className="benefits">
        <h2>Vantagens da <span>Locação</span></h2>
        <ul className="benefit-items">
          {['Atenda seus pacientes de onde quiser', 'Tenha um consultório completo sem despesas fixas', 'Alugue por períodos de 1, 2, 4 e 6h', 'Reserve com total segurança'].map((benefit, index) => (
            <li key={index}>
              <FaCheckCircle className="icon" />
              {benefit}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Howtorent;
