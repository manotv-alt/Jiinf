import { useState, useEffect } from 'react';
import { ModalityCard } from './Cards';
import useApi from '../hooks/useApi';

const Slider = ({ modalities, slidesToShow }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalCards = modalities.length;

  const preloadImages = (modalities) => {
    modalities.forEach((modality) => {
      const img = new Image();
      img.src = modality.url_image;
    });
  };

  useEffect(() => {
    preloadImages(modalities);
  }, [modalities]);

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

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { loadingHome } = useApi();

  const preloadImages = (imageUrls) => {
    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      images.length > 0 ? (prevIndex + 1) % images.length : 0
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      images.length > 0 ? (prevIndex - 1 + images.length) % images.length : 0
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [images]);

  
  useEffect(() => {

    if(loadingHome === false) {
      preloadImages(images);
    }

  }, [images]);

  useEffect(() => {
    if (currentIndex >= images.length) {
      setCurrentIndex(0);
    }
  }, [images, currentIndex]);

  if (!images || images.length === 0) {
    return 1;
  }

  return (
    <div className="hidden md:flex relative w-full overflow-hidden rounded-lg shadow-lg ring-2 ring-jiinf-primary mt-8 ml-8">
      <div
        className="w-full h-full bg-cover bg-center transition-all duration-500"
        style={{ backgroundImage: `url('${images[currentIndex]}')` }}
      ></div>

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 ring-2 ring-jiinf-primary -translate-y-1/2 w-12 h-12 bg-white text-jiinf-primary hover:text-white p-2 rounded-full hover:bg-jiinf-secondary"
      >
        &#10094;
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 ring-2 ring-jiinf-primary -translate-y-1/2 w-12 h-12 bg-white text-jiinf-primary hover:text-white p-2 rounded-full hover:bg-jiinf-secondary"
      >
        &#10095;
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export { Slider, Carousel };