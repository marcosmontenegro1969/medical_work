import React, { useState } from 'react';
import { Carousel as BootstrapCarousel } from 'react-bootstrap';
import SalaCard from './SalaCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Carousel.css';
import salas from './salas';

const MyCarousel = () => {
  const totalSlides = salas.length;
  const slidesPerPage = 3;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + slidesPerPage >= totalSlides ? 0 : prevIndex + slidesPerPage
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalSlides - slidesPerPage : prevIndex - slidesPerPage
    );
  };

  return (
    <div className="carousel-container">
      <button className="left-arrow" onClick={handlePrev}>
        &lt;
      </button>
      <BootstrapCarousel indicators={false} interval={null} controls={false}>
        <BootstrapCarousel.Item>
          <div className="d-flex justify-content-center">
            {[...Array(slidesPerPage)].map((_, index) => {
              const slideIndex = (currentIndex + index) % totalSlides;
              const sala = salas[slideIndex];
              return (
                <div key={sala.codigo} className="col-md-3">
                  <SalaCard
                    codigo={sala.codigo}
                    descricao={sala.descricao}
                    preco={sala.preco}
                    periodo={sala.periodo}
                    localizacao={sala.localizacao}
                  />
                </div>
              );
            })}
          </div>
        </BootstrapCarousel.Item>
      </BootstrapCarousel>
      <button className="right-arrow" onClick={handleNext}>
        &gt;
      </button>
    </div>
  );
};

export default MyCarousel;
