import { useState, useEffect } from "react";
import { DatePicker, TeamPicker } from "../components/Pickers";
import { GameCard, GameCardNone } from "../components/GameCards";
import useApi from "../hooks/useApi";
import { Loading } from "../components/Loading";

export function Calendar() {
  const { gameData, loadingCalendar } = useApi();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [filteredGames, setFilteredGames] = useState([]);
  const [noGamesFound, setNoGamesFound] = useState(false);

  useEffect(() => {
    const checkFilteredGames = async () => {
      if (!loadingCalendar && gameData) {
        const filteredGames = gameData.filter((game) => {
          const matchesTeam = selectedTeam ? game.TimeA.nome === selectedTeam || game.TimeB.nome === selectedTeam || game.TimeA.nome === game.TimeB.nome : true;
          const matchesDate = selectedDate ? game.data.toString() === selectedDate : true;
          return matchesDate && matchesTeam;
        });
  
        setFilteredGames(filteredGames);
        setNoGamesFound(filteredGames.length === 0);
      }
    };
  
    checkFilteredGames();
  }, [loadingCalendar, gameData, selectedDate, selectedTeam]);
  

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="flex px-4 flex-col my-8 sm:flex-row md:my-16 w-full items-center justify-center gap-6 md:gap-8">
        <DatePicker onChange={setSelectedDate} />
        <TeamPicker onChange={setSelectedTeam} />
      </div>
  
      {loadingCalendar ? (
        <Loading/>
      ) : (
        <div className="flex flex-col w-full gap-8">
          {noGamesFound ? (
            <h2 className="flex w-full mt-8 h-full justify-center text-center items-center text-3xl font-semibold">
              Nenhum esporte encontrado
            </h2>
          ) : (
            filteredGames.map((game, index) => (
              game.TimeA.nome === game.TimeB.nome ? (
                <GameCardNone key={index} game={game} />
              ) : (
                <GameCard key={index} game={game} />
              )
            ))
          )}
        </div>
      )}
    </div>
  );
  
}
