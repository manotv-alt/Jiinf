import { useEffect, useState } from 'react';
import Carousel from '../components/Carousel';
import { Loading } from '../components/Loading';
import useApi from '../hooks/useApi';

export function Modalitys() {
  const { loadingModalitys, modalitys } = useApi();
  const [slidesToShow, setSlidesToShow] = useState(4);

  // Responsividade para determinar quantos slides exibir
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSlidesToShow(4); // 4 cards em telas grandes
      } else if (window.innerWidth >= 768) {
        setSlidesToShow(3); // 3 cards em tablets
      } else if (window.innerWidth >= 640) {
        setSlidesToShow(2); // 2 cards em telas médias
      } else {
        setSlidesToShow(1); // 1 card em telas pequenas
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
  <div className="flex w-full justify-center items-center">
    {loadingModalitys ? (
      <Loading />
    ) : (
      <Carousel modalitys={modalitys} slidesToShow={slidesToShow}/>
    )}
  </div>
</div>
  );
}
