import useApi from "../hooks/useApi";
import { useState, useEffect } from "react";

const SupporterBoard = () => {
  const { teams, UpdateVotes } = useApi();
  const [mostVotedTeam, setMostVotedTeam] = useState(null);
  const [votedTeams, setVotedTeams] = useState(() => {
    // Carrega os times votados do LocalStorage ao iniciar
    const savedVotes = localStorage.getItem("votedTeams");
    return savedVotes ? JSON.parse(savedVotes) : [];
  });

  useEffect(() => {
    if (teams.length > 0) {
      const topTeam = teams.reduce(
        (max, team) => (team.total_votos > max.total_votos ? team : max),
        teams[0]
      );
      setMostVotedTeam(topTeam.total_votos);
    }
  }, [teams]);

  const handleVote = async (teamId) => {
    try {
      await UpdateVotes(teamId);

      const updatedVotes = [...votedTeams, teamId]; // Adiciona o time votado
      setVotedTeams(updatedVotes);
      localStorage.setItem("votedTeams", JSON.stringify(updatedVotes)); // Salva no LocalStorage
      alert("Voto computado com sucesso!");
    } catch (error) {
      alert("Erro ao votar. Tente novamente.");
    }
  };

  return (
    <div className="w-full mx-4 md:w-1/2 md:mx-8 mt-12 ring-2 ring-jiinf-primary bg-jiinf-secondary rounded-lg shadow-lg p-6 space-y-6">
      <h2 className="text-3xl font-bold text-white text-center mb-4">Torcedômetro</h2>
      {teams.map((team, index) => {
        const votePercentage = (team.total_votos / mostVotedTeam) * 100;
        const isVoted = votedTeams.includes(team.time_id); // Verifica se já votado

        return (
          <div key={index} className="flex flex-col pt-6 gap-0">
            <div className="flex flex-row items-center mb-4 gap-4">
              <img
                src={team.url_image}
                alt={`${team.name} Logo`}
                className="w-12 h-12 rounded-full ring-2 ring-white"
              />
              <div className="flex min-w-24 text-white text-center text-sm font-medium">
                {team.nome}
              </div>

              <div className="flex w-full justify-end">
                <button
                  onClick={() => handleVote(team.time_id)}
                  disabled={isVoted} // Desativa o botão se votado
                  className={`bg-white font-semibold hover:bg-jiinf-primary hover:text-white 
                    text-jiinf-primary rounded-lg ring-2 ring-jiinf-primary px-4 py-1 
                    ${isVoted ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isVoted ? 'Votado' : 'Torcer'}
                </button>
              </div>
            </div>

            <div className="flex-1 flex items-center">
              <div className="flex-1 bg-white rounded-full h-4">
                <div
                  className="bg-jiinf-primary ring-1 ring-jiinf-primary h-4 rounded-full"
                  style={{ width: `${votePercentage}%` }}
                ></div>
              </div>
              <span className="ml-4 text-sm text-white font-semibold">
                {team.total_votos} votos
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export { SupporterBoard };
