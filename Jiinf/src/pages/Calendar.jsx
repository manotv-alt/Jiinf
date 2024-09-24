import { useState, useContext, useEffect } from "react";
import DatePicker from "../components/DatePicker";
import GameCard from "../components/GameCard";
import TeamPicker from "../components/TeamPicker";
import DataContext from "../contexts/DataContext";
import { Fetch } from "../api/consumer";
import GameCardNone from "../components/GameCardNone";

export function Calendar() {

  const { data, error } = useContext(DataContext);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [gameData, setGameData] = useState([]);
  const [gameDataNone, setGameDataNone] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function bla() {
      try {
        const url = new Fetch("https://jiinf.vercel.app");
        const ax = await url.GetEventos();
        setGameData(ax);
        setLoading(true); 
      } catch (error) {
        console.log(error);
        setLoading(true); 
      }
        finally {
        setLoading(false); 
      }
    }

    bla();
  }, []);

  const filteredGames = gameData.filter((game) => {
    
    const matchesTeam = selectedTeam ? game.TimeA.nome === selectedTeam || game.TimeB.nome === selectedTeam : true;
    const matchesDate = selectedDate ? game.data.toString() === selectedDate : true;

    return matchesDate && matchesTeam;
  });

  

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
          <GameCardNone game={gameData[0]}/>
          {filteredGames.length > 0 ? (
            filteredGames.map((game, index) => (
              <GameCard key={index} game={game} />
            ))
          ) : (
            <h2 className="flex w-full h-full justify-center items-center text-3xl font-semibold">Nenhum esporte encontrado</h2>
          )}
        </div>
      )}
    </div>
  );
}
