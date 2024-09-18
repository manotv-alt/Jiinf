import { ModalityCard } from "../components/ModalityCard";
import goldmedal from "../assets/gold-medal.png"
import silvermedal from "../assets/silver-medal.png"
import bronzemedal from "../assets/bronze-medal.png"
import { useEffect, useState } from "react";
import { Fetch } from "../api/consumer";

export function Home() {

  const [teams, setTeams] = useState([]);
  const [hub, setHub] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect (() => {

    async function bla () {
        try {
        const url = new Fetch ("https://jiinf.vercel.app");
        const ax = await url.GetTimes();
        const ax2 = await url.GetHome();
        setTeams(ax);
        setHub(ax2);

        } catch(error) {
            console.log(error);
        } finally {
          setLoading(false);
        }
        
    }

    bla();
  }, [])

  const sortedTeams = teams.sort((a, b) => b.pontuacao_total - a.pontuacao_total);

  return (

    <div className="w-full px-8 sm:px-12 md:px-12 lg:px-16">
      {loading ? (
          <div className="flex mt-16 justify-center items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-jiinf-primary"></div>
          </div>
        ) : (

    <div className="relative flex flex-col justify-center items-center min-h-screen min-w-screen rounded-lg bg-white mx-12 mt-12">
      <img 
        src={hub[0].url_background} 
        alt="bg-home"
        className="flex min-h-screen min-w-screen rounded-lg"
      />
  
      <div className="absolute right-0 top-0 w-full lg:w-2/5 h-full bg-jiinf-primary bg-opacity-50 rounded-r-lg">
        <h2 className="text-white text-3xl lg:text-4xl flex mt-4 justify-center font-bold">Classificação Geral</h2>
  
        <div className="flex justify-between w-full mt-12">
          <div className="flex flex-row justify-between w-full items-center">
            <h2 className="flex text-lg lg:text-2xl ml-4 mr-16 lg:mr-28 font-bold text-white justify-start">Equipes</h2>
          
            <div className="flex w-full flex-row items-center justify-end gap-3 lg:gap-6 mr-2 lg:mr-6">
              <img src={goldmedal} alt="goldmedal" className="flex w-7 h-7"/>
              <img src={silvermedal} alt="silvermedal" className="flex w-7 h-7"/>
              <img src={bronzemedal} alt="bronzemedal" className="flex w-7 h-7"/>
              <h2 className="flex w-full text-lg lg:text-2xl font-bold text-white">Pontos</h2>
            </div>
          </div>
        </div>
  
        <div className="flex flex-col w-full mt-8">
          {sortedTeams.map((team, index) => (
            <div key={team.id} className="flex flex-row justify-between items-center mx-4 mb-4">
              <h3 className="text-white text-lg lg:text-xl">{index + 1}</h3>
              <img src={team.url_image} alt={`${team.nome}-logo`} className="w-8 h-8 ml-4"/>
              <h3 className="text-white text-lg lg:text-xl flex-grow ml-4">{team.nome}</h3>
              <h3 className="text-white text-lg lg:text-xl">{team.pontuacao_total}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
    )}
    </div>
  );
}