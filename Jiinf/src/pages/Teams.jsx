import { useEffect, useState } from "react";
import TeamCard from "../components/TeamCard";
import { Fetch } from "../api/consumer";

export function Teams() {
  const [teamsData, setTeamsData] = useState(null); // inicializa com 'null'
  const [teams, setTeams] = useState([]); // inicializa como array vazio
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTeams() {
      try {
        const url = new Fetch("https://jiinf.vercel.app");
        const data = await url.GetEquipes();
        setTeamsData(data);
        if (data && data.equipes) {
          setTeams(data.equipes); // Atualiza o estado 'teams' diretamente quando 'teamsData' for obtido
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Remove o loading após tentar carregar os dados
      }
    }

    fetchTeams(); // Chama a função de fetch
  }, []); // Executa o efeito apenas uma vez no carregamento inicial


  return (
    <div className="pt-8 flex flex-col w-full items-center justify-center">
      <h1 className="font-SuperDario text-6xl md:text-8xl text-jiinf-titles pb-10">PARTICIPANTES</h1>

      <div className="w-full px-8 sm:px-12 md:px-12 lg:px-16">
        {loading ? (
          <div className="flex mt-16 justify-center items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-jiinf-primary"></div>
          </div>
        ) : (
          <div className="w-full flex justify-center items-center px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
              {teams.map((team, index) => (
                <TeamCard
                  key={index}
                  title={team.nome}
                  description={team.desc}
                  imageSrc={team.url_image}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
