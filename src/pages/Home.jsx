import goldmedal from "../assets/medals/gold-medal.png";
import silvermedal from "../assets/medals/silver-medal.png";
import bronzemedal from "../assets/medals/bronze-medal.png";
import useApi from "../hooks/useApi";
import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { SupporterBoard } from "../components/SupporterBoard";
import { Carousel } from "../components/Slider";
import Classification from "../components/Classification";

export function Home() {
  
  const { background, home, loadingHome, loadingTeams, results } = useApi();
  const [ sortedTeams, setSortedTeams ] = useState([]);
  const isLoading = loadingHome || loadingTeams;
  
  useEffect(() => {
    if (!loadingHome && Array.isArray(results) && results.length > 0) {
      const sorted = results.sort((a, b) => b.total_pontos - a.total_pontos);
      setSortedTeams(sorted);
    }
  }, [loadingHome, results]);

  return (
    isLoading ? (
      <Loading />
    ) : (
      <div className="flex flex-col md:flex-row py-8 mb-8 justify-evenly mx-6 lg:mx-0 gap-8 lg:gap-0">
        <div className="flex px-2 md:px-8 w-full overflow-hidden lg:w-2/3 flex-col gap-8 lg:gap-4 text-center justify-evenly">
          <h2 className="text-2xl md:text-3xl font-bold text-jiinf-secondary">Seja bem-vindo(a) aos Jogos Internos do Instituto de Informática!</h2>
          <Carousel images={home.images_url}/>
          <p className="hidden md:flex flex-col w-full text-justify tracking-wide leading-relaxed px-4 items-center justify-center">{home.texto}</p>
        </div>
        <div className="flex w-full lg:w-1/3 items-center justify-center lg:justify-between flex-col px-2 md:px-8 lg:pr-8 lg:pl-4 gap-8 lg:gap-4">
          <Classification/>
          <SupporterBoard/>
        </div>
      </div>
    ));  
}
