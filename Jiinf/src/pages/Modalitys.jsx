import Slider from 'react-slick';
import { ModalityCard } from '../components/ModalityCard';
import { useEffect, useState } from 'react';
import { Fetch } from '../api/consumer';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FaSpinner } from 'react-icons/fa';

const NextArrow = ({ onClick }) => {
  return (
    <div
      className="absolute top-1/2 right-3 transform -translate-y-1/2 z-10 cursor-pointer"
      onClick={onClick}
    >
      <FaChevronRight className="text-4xl text-jiinf-primary hover:text-jiinf-titles transition-colors duration-300" />
    </div>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <div
      className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10 cursor-pointer"
      onClick={onClick}
    >
      <FaChevronLeft className="text-4xl text-jiinf-primary hover:text-jiinf-titles transition-colors duration-300" />
    </div>
  );
};

export function Modalitys() {
  const [modalitys, setModalitys] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function bla() {
      try {
        const url = new Fetch('https://jiinf.vercel.app');
        const ax = await url.GetModalidades();
        setModalitys(ax);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    bla();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="flex flex-col justify-center items-center h-full w-full pt-8">
      <h1 className="font-SuperDario text-6xl md:text-8xl text-jiinf-titles pb-10">
        II EDIÇÃO JIINF 
      </h1>
      <div className="w-full px-8 sm:px-12 md:px-12 lg:px-16">
        {loading ? (
          <div className="flex mt-16 justify-center items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-jiinf-primary"></div>
          </div>
        ) : (
          <Slider {...settings} className="flex flex-nowrap">
            {modalitys.map((sport, index) => (
              <div
                key={index}
                className="flex-shrink-0 gap-12 w-full justify-center items-center px-8 sm:px-16 md:px-12 lg:px-8"
              >
                <ModalityCard
                  name={sport.nome}
                  description={sport.desc}
                  imgSrc={sport.url_image}
                />
              </div>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
}
