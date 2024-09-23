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
        const ax = await url.GetResultados();
        const ax2 = await url.GetHome();
        setTeams(ax.times);
        setHub(ax2);

        } catch(error) {
            console.log(error);
        } finally {
          setLoading(false);
        }
        
    }

    bla();
  }, [])

  const sortedTeams = teams.sort((a, b) => b.total_pontos - a.total_pontos);

  return (

    <div className="w-full">
      {loading ? (
          <div className="flex mt-16 justify-center items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-jiinf-primary"></div>
          </div>
        ) : (

    <div className="relative flex flex-col justify-center items-center min-h-screen min-w-screen rounded-lg bg-white mx-8 mt-8">
      <img 
        src={hub[0]?.url_background} 
        alt="bg-home"
        className="flex min-h-screen min-w-screen rounded-lg"
      />
  
  <div className="absolute right-0 top-0 w-full lg:w-2/5 h-full bg-jiinf-primary bg-opacity-75 rounded-r-lg rounded-l-lg ">
  <h2 className="text-white text-3xl font-bold lg:text-4xl flex mt-4 justify-center">Classificação Geral</h2>

  <div className="flex justify-between w-full mt-12">
    <div className="flex flex-row justify-between w-full items-center">
      <h2 className="flex text-lg lg:text-2xl ml-4 mr-16 lg:mr-28 font-bold text-white justify-start">Equipes</h2>

      <div className="flex w-full flex-row justify-end gap-3 lg:gap-6 mr-3 lg:mr-6">
        {/* Ícones e quantidade de medalhas */}
        <div className="flex flex-col items-center">
          <img src={goldmedal} alt="goldmedal" className="w-7 h-7"/>
          <h3 className="text-white text-sm lg:text-base">{teams.pontuacao_total}</h3>
        </div>
        <div className="flex flex-col items-center">
          <img src={silvermedal} alt="silvermedal" className="w-7 h-7"/>
          <h3 className="text-white text-sm lg:text-base">{teams.pontuacao_total}</h3>
        </div>
        <div className="flex flex-col items-center">
          <img src={bronzemedal} alt="bronzemedal" className="w-7 h-7"/>
          <h3 className="text-white text-sm lg:text-base">{teams.pontuacao_total}</h3>
        </div>
      </div>

      <h2 className="text-lg lg:text-2xl font-bold text-white mr-3">Pontos</h2>
    </div>
  </div>

  {/* Listagem das equipes */}
  <div className="flex flex-col w-full mt-8">
    {sortedTeams.map((team, index) => (
      <div key={team.id} className="flex flex-row justify-between items-center mx-4 mb-4 border-b border-white pb-4">
        <h3 className="text-white text-xl font-bold lg:text-2xl">{index + 1}</h3>
        <div className="flex lg:flex-row pl-4 h-full justify-init items-center">
        <img src={team.url_image} alt={`${team.nome}-logo`} className="w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16"/>
        <h3 className="text-white text-md font-semibold lg:font-bold lg:text-lg flex-grow ml-3">{team.nome}</h3>
        </div>
        

        <div className="flex w-full flex-row items-center justify-end gap-8 lg:gap-10 mr-10 lg:mr-20">
          <div className="text-center">
            <h3 className="text-white font-bold text-lg lg:text-xl">{team.total_medalhas.OURO}</h3>
          </div>
          <div className="text-center">
            <h3 className="text-white font-bold text-lg lg:text-xl">{team.total_medalhas.PRATA}</h3>
          </div>
          <div className="text-center">
            <h3 className="text-white font-bold text-lg lg:text-xl">{team.total_medalhas.BRONZE}</h3>
          </div>
        </div>

        <h3 className="text-white mr-5 lg:mr-4 font-bold text-xl lg:text-2xl">{team.total_pontos}</h3>
      </div>
    ))}
  </div>
</div>
    </div>
    )}
    </div>
  );
}