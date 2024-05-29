// src/components/HowItWorks.js
import React from 'react';
import '../styles/HowItWorks.css';

const HowItWorks = () => {
  return (
    <div className="how-it-works">
      <h2>Como funciona a <span>Medical Clinic</span></h2>
      <p>Bem-vindo(a) à comunidade de compartilhamento de espaços da área da saúde. A nossa plataforma conecta de forma simples, rápida e segura os proprietários de consultórios com os profissionais da saúde que desejam alugar estes espaços. Mais rentabilidade, flexibilidade e segurança através de uma curadoria rigorosa.</p>
      
      <h3>Quer alugar um consultório?</h3>
      <p>Atenda seus pacientes de onde quiser pagando apenas por períodos utilizados. É possível escolher seu consultório a partir da cidade, bairro, preços e até mesmo por períodos curtos e específicos. É mais flexibilidade para você e mais comodidade para seus pacientes.</p>
      
      <h3>Quer anunciar um consultório?</h3>
      <p>Com a Medical Clinic, você pode disponibilizar seu consultório 7 dias por semana divididos em até 3 períodos de 4h por dia. Além de seguro, você tem total autonomia para definição de regras, datas, horários e preços. É uma ótima maneira de tornar rentável seu espaço ocioso.</p>
    </div>
  );
};

export default HowItWorks;
