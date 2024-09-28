import React, { useState } from 'react';
import { ModalityCard } from './Cards';

const Slider = ({ modalitys, slidesToShow }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalCards = modalitys.length;

  // Função para ir para o slide anterior
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? totalCards - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  // Função para ir para o próximo slide
  const nextSlide = () => {
    const isLastSlide = currentIndex === totalCards - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // Lógica para exibir os slides visíveis
  const visibleCards = modalitys.slice(currentIndex, currentIndex + slidesToShow).concat(
    modalitys.slice(0, Math.max(0, (currentIndex + slidesToShow) - totalCards))
  );

  return (
    <div className="relative w-full min-h-fit flex flex-col items-center overflow-hidden">
      {/* Botão para o slide anterior */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white ring-2 ring-jiinf-primary text-jiinf-primary text-3xl h-12 w-12 rounded-full hover:text-white hover:bg-jiinf-secondary"
        style={{ zIndex: 100 }}
      >
        &#10094;
      </button>

      {/* Container dos slides */}
      <div className="flex justify-center h-[480px] items-center gap-6 transition-transform duration-500 ease-in-out w-full px-6">
        {visibleCards.map((sport, index) => (
          <div
            key={index}
            className="flex justify-center items-center"
            style={{ flex: `0 0 calc(100% / ${slidesToShow} - 20px)` }}
          >
            <ModalityCard
              name={sport.nome}
              description={sport.desc}
              imgSrc={sport.url_image}
            />
          </div>
        ))}
      </div>

      {/* Botão para o próximo slide */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white ring-2 ring-jiinf-primary text-jiinf-primary text-3xl h-12 w-12 rounded-full hover:text-white hover:bg-jiinf-secondary"
        style={{ zIndex: 100 }}
      >
        &#10095;
      </button>

      {/* Indicadores dos slides */}
      <div className="flex mt-6 space-x-2 md:space-x-4">
        {modalitys.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full ${index === currentIndex ? 'bg-black' : 'bg-gray-400'}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slider;