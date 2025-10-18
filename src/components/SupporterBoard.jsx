import useApi from "../hooks/useApi";
import { useState, useMemo } from "react";

const SupporterBoard = () => {
  const { teams, UpdateVotes } = useApi();

  const [votedTeams, setVotedTeams] = useState(() => {
    const savedVotes = localStorage.getItem("votedTeams");
    return savedVotes ? JSON.parse(savedVotes) : [];
  });

  const sortedTeams = useMemo(() => {
    if (!Array.isArray(teams) || teams.length === 0) return [];
    return [...teams].sort((a, b) => (b.total_votos || 0) - (a.total_votos || 0));
  }, [teams]);

  const mostVotedTeam = useMemo(() => {
    if (!sortedTeams.length) return 1;
    return sortedTeams[0].total_votos || 1;
  }, [sortedTeams]);

  const handleVote = async (teamId) => {
    try {
      await UpdateVotes(teamId);

      const updatedVotes = [...votedTeams, teamId]; // Adiciona o time votado
      setVotedTeams(updatedVotes);
      localStorage.setItem("votedTeams", JSON.stringify(updatedVotes)); // Salva no LocalStorage
      alert("Voto computado com sucesso!");
    } catch (error) {
      alert("Você já votou! Tente novamente amanhã.");
    }
  };

  return (
    <div className="w-full h-full ring-2 ring-white bg-gradient-to-t from-blue-800 to-jiinf-secondary rounded-lg shadow-lg p-6">
      <h2 className="text-3xl font-bold text-white text-center mb-4">Torcidômetro</h2>
      {sortedTeams.map((team, index) => {
        const votePercentage = ((team.total_votos || 0) / mostVotedTeam) * 100;
        const isVoted = votedTeams.includes(team.time_id); // Verifica se já votado

        return (
          <div key={team.time_id || index} className="flex flex-col pt-6 gap-0">
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
                {team.total_votos || 0} pontos
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export { SupporterBoard };
