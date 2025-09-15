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

  // Function to convert date and time to Date objects
  const parseDateTime = (dia, horario) => {
    const now = new Date(); // Using the current date
    return new Date(now.getFullYear(), now.getMonth(), dia, ...horario.split(':'));
  };

  useEffect(() => {
    const compareGames = (a, b) => {
      const dateA = parseDateTime(a.data, a.horario);
      const dateB = parseDateTime(b.data, b.horario);

      // Put "Não iniciado" before "Finalizado"
      if (a.status === "Não iniciado" && b.status === "Finalizado") return -1;
      if (a.status === "Finalizado" && b.status === "Não iniciado") return 1;

      // Ordening inside of the groups
      if (a.status === "Não iniciado") {
        return dateA - dateB; // Creasing order "Não iniciado"
      } else {
        return dateB - dateA; // Decreasing order "Finalizado"
      }
    };

    const filterAndSortGames = async () => {
      if (!loadingCalendar && gameData) {
        const filtered = gameData.filter((game) => {
          const matchesTeam = selectedTeam
            ? game.TimeA.nome === selectedTeam ||
              game.TimeB.nome === selectedTeam ||
              game.TimeA.nome === game.TimeB.nome
            : true;
          const matchesDate = selectedDate
            ? game.data.toString() === selectedDate
            : true;
          return matchesDate && matchesTeam;
        });

        const sortedGames = filtered.sort(compareGames);
        setFilteredGames(sortedGames);
        setNoGamesFound(sortedGames.length === 0);
      }
    };

    filterAndSortGames();
  }, [loadingCalendar, gameData, selectedDate, selectedTeam]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      {/* Pickers container */}
      <div className="flex px-4 flex-col my-8 sm:flex-row md:my-16 w-full items-center justify-center gap-6 md:gap-8">
        <DatePicker onChange={setSelectedDate} />
        <TeamPicker onChange={setSelectedTeam} />
      </div>

      {/* Gamecards mapping */}
      {loadingCalendar ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-4 mb-10">
          {noGamesFound ? (
            <h2 className="flex w-full mt-8 h-full justify-center text-center items-center text-3xl font-semibold">
              Nenhum esporte encontrado
            </h2>
          ) : (
            filteredGames.map((game, index) =>
              game.TimeA.nome === game.TimeB.nome ? (
                <GameCardNone key={index} game={game} />
              ) : (
                <GameCard key={index} game={game} />
              )
            )
          )}
        </div>
      )}
    </div>
  );
}