import { useState, useEffect } from "react";
import { DatePicker, TeamPicker } from "../components/Pickers";
import { GameCard, GameCardNone } from "../components/GameCards";
import useApi from "../hooks/useApi";

export function Calendar() {
  const { gameData, loading } = useApi();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [noGamesFound, setNoGamesFound] = useState(false);

  useEffect(() => {
    const checkFilteredGames = async () => {
      if (!loading) {
        const filteredGames = gameData.filter((game) => {
          const matchesTeam = selectedTeam ? game.TimeA.nome === selectedTeam || game.TimeB.nome === selectedTeam : true;
          const matchesDate = selectedDate ? game.data.toString() === selectedDate : true;
          return matchesDate && matchesTeam;
        });

        setNoGamesFound(filteredGames.length === 0);
      }
    };
  
    checkFilteredGames(); // Chama a função assíncrona
  }, [loading, gameData, selectedDate, selectedTeam]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="flex px-4 flex-col my-8 sm:flex-row md:my-16 w-full items-center justify-center gap-6 md:gap-8">
        <DatePicker onChange={setSelectedDate} />
        <TeamPicker onChange={setSelectedTeam} />
      </div>

      {loading ? (
        <div className="flex mt-12 justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-jiinf-primary"></div>
        </div>
      ) : (
        <div className="flex flex-col w-full gap-8">
          {noGamesFound ? (
            <h2 className="flex w-full h-full justify-center items-center text-3xl font-semibold">
              Nenhum esporte encontrado
            </h2>
          ) : (
            gameData.filter((game) => {
              const matchesTeam = selectedTeam ? game.TimeA.nome === selectedTeam || game.TimeB.nome === selectedTeam : true;
              const matchesDate = selectedDate ? game.data.toString() === selectedDate : true;
              return matchesDate && matchesTeam;
            }).map((game, index) => (
              <GameCard key={index} game={game} />
            ))
          )}
        </div>
      )}
    </div>
  );
}
