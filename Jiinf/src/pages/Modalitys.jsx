import Slider from 'react-slick';
import { ModalityCard } from '../components/Cards';
import { PrevArrow, NextArrow } from '../components/Arrows';
import useApi from '../hooks/useApi';

export function Modalitys() {
  const { loading, modalitys } = useApi();

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
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
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
      <div className="flex w-full justify-center items-center">
        {loading ? (
          <div className="flex mt-16 justify-center items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-jiinf-primary"></div>
          </div>
        ) : (
          <Slider {...settings} className="flex w-full items-center justify-center">
            {modalitys.map((sport, index) => (
              <div
                key={index}
                className="flex w-full ml-7 mb-10 justify-center items-center"
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
