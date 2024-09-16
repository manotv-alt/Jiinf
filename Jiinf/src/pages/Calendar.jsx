import { useState, useContext } from "react"
import DatePicker from "../components/DatePicker"
import GameCard from "../components/GameCard"
import TeamPicker from "../components/TeamPicker";
import DataContext from "../contexts/DataContext";

export function Calendar() {

    const { data, loading, error } = useContext(DataContext);
    
    const [label, setLabel] = useState();

    const changeDate = (date) => {
        setLabel(date);
    }

    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            
            <div className="flex px-4 flex-col sm:flex-row w-full items-center justify-center gap-8 sm:gap-24 p-20">
                <DatePicker label={label} onChange={changeDate}/>
                <TeamPicker/>
            </div>
            
            
            <div className="flex flex-col w-full gap-8">
            <GameCard/>
            <GameCard/>
            <GameCard/>
            <GameCard/>
            <GameCard/>
            <GameCard/>
            <GameCard/>
            <GameCard/>
            </div>
            
        </div>
    )
}