import { useState, useEffect } from 'react';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { Fetch } from '../api/consumer';

const TeamPicker = ({ onChange }) => {

  const [selectedTeam, setSelectedTeam] = useState('');
  const [teamsData, setTeamsData] = useState([]);

  useEffect (() => {

    async function setSearch () {
        try {
        const url = new Fetch ("https://jiinf.vercel.app");
        const ax = await url.GetTimes();
        setTeamsData(ax);

        } catch(error) {
            console.log(error);
        }
        
    }

    setSearch();
    
  }, [])

  const handleTeamChange = (event) => {
    const { value } = event.target;
    setSelectedTeam(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="relative">
      <select
        value={selectedTeam}
        onChange={handleTeamChange}
        className="border border-jiinf-primary text-jiinf-primary rounded-lg px-10 py-2 pr-10 bg-white appearance-none"
      >
        <option value="" >Todas as Equipes</option>
        {teamsData.map((Team) => (
          <option key={Team.nome} value={Team.nome}>
            {Team.nome}
          </option>
        ))}
      </select>
      <CalendarIcon className="absolute top-1/2 left-3 transform -translate-y-1/2 h-5 w-5 text-jiinf-primary pointer-events-none" />
    </div>
  );
};

export default TeamPicker;
