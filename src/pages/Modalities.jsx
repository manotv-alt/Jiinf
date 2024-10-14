import { useEffect, useState } from 'react';
import { Slider } from '../components/Slider';
import { Loading } from '../components/Loading';
import useApi from '../hooks/useApi';

export function Modalities() {
  const { loadingModalities, modalities } = useApi();
  const [slidesToShow, setSlidesToShow] = useState(4);

  // Responsivity to show the right quantity of cards
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSlidesToShow(4); // 4 cards on large screens
      } else if (window.innerWidth >= 768) {
        setSlidesToShow(3); // 3 cards on tablets
      } else if (window.innerWidth >= 640) {
        setSlidesToShow(2); // 2 cards on middle screens
      } else {
        setSlidesToShow(1); // 1 card on small screens
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-full w-full pt-8">
  <h1 className="font-SuperDario text-center text-6xl md:text-7xl text-jiinf-titles pb-10">
    MODALIDADES DESTA EDIÇÃO
  </h1>

  {/* Modalities card container*/}
  <div className="flex w-full justify-center items-center">
    {loadingModalities ? (
      <Loading />
    ) : (
      <Slider modalities={modalities} slidesToShow={slidesToShow}/>
    )}
  </div>
</div>
  );
}
