import React, { useState } from 'react';
import { ModalityCard } from './Cards';

const Slider = ({ modalities, slidesToShow }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalCards = modalities.length;

  // Prev slider function
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? totalCards - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  // Next slider function
  const nextSlide = () => {
    const isLastSlide = currentIndex === totalCards - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // Logic to show the visible cards
  const visibleCards = modalities.slice(currentIndex, currentIndex + slidesToShow).concat(
    modalities.slice(0, Math.max(0, (currentIndex + slidesToShow) - totalCards))
  );

  return (
    <div className="relative w-full min-h-fit flex flex-col items-center overflow-hidden">
      {/* Button to prev slider */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white ring-2 ring-jiinf-primary text-jiinf-primary text-3xl h-12 w-12 rounded-full hover:text-white hover:bg-jiinf-secondary"
        style={{ zIndex: 100 }}
      >
        &#10094;
      </button>

      {/* Sliders container */}
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

      {/* Next slider button */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white ring-2 ring-jiinf-primary text-jiinf-primary text-3xl h-12 w-12 rounded-full hover:text-white hover:bg-jiinf-secondary"
        style={{ zIndex: 100 }}
      >
        &#10095;
      </button>

      {/* Slider index */}
      <div className="flex mt-6 space-x-2 md:space-x-4">
        {modalities.map((_, index) => (
          <div
            key={index}
            className={`h-1.5 w-1.5 md:h-2 md:w-2 rounded-full ${index === currentIndex ? 'bg-black' : 'bg-gray-400'}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slider;