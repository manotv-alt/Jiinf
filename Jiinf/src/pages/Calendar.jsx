import { useState, useContext, useEffect } from "react"
import DatePicker from "../components/DatePicker"
import GameCard from "../components/GameCard"
import TeamPicker from "../components/TeamPicker";
import DataContext from "../contexts/DataContext";
import hand from '../assets/handball.png';
import { Fetch } from "../api/consumer";

export function Calendar() {


    const { data, loading, error } = useContext(DataContext);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTeam, setSelectedTeam] = useState("");
    const [gameData, setGameData] = useState([]);


    useEffect (() => {

        async function bla () {
            try {
            const url = new Fetch ("https://jiinf.vercel.app");
            const ax = await url.GetEventos();
            setGameData(ax);
    
            } catch(error) {
                console.log(error);
            }
            
        }

        bla();
    }, [])

    console.log(gameData);


    const filteredGames = gameData.filter((game) => {
        const matchesDate = selectedDate ? game.data === selectedDate : true;
        const matchesTeam = selectedTeam ? game.TimeA.nome === selectedTeam || game.TimeB.nome === selectedTeam : true;

        return matchesDate && matchesTeam;
    });

    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            
            <div className="flex px-4 flex-col sm:flex-row w-full items-center justify-center gap-8 sm:gap-24 p-20">
                <DatePicker onChange={setSelectedDate}/>
                <TeamPicker onChange={setSelectedTeam}/>
            </div>
            
            
            <div className="flex flex-col w-full gap-8">
                {filteredGames.length > 0 ? (
                filteredGames.map((game, index) => (
                    <GameCard
                    key={index}
                    game = {game}
                    />
                ))
                ) : (
                <p>No games found</p>
                )}
            </div>
            
        </div>
    )
}