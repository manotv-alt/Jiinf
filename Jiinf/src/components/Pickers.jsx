import { useState } from 'react';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { ShieldHalf } from 'lucide-react';
import useApi from '../hooks/useApi';

const DatePicker = ({ onChange }) => {
  const [selectedDate, setSelectedDate] = useState('');

  const dates = [
    { value: "1", label: '19 de Outubro de 2024' },
    { value: "2", label: '20 de Outubro de 2024' },
    { value: "3", label: '26 de Outubro de 2024' },
    { value: "4", label: '02 de novembro de 2024' },
    { value: "5", label: '03 de novembro de 2024' },
  ];

  const handleDateChange = (event) => {
    const { value } = event.target;
    setSelectedDate(value);

    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="relative">
      <select
        value={selectedDate}
        onChange={handleDateChange}
        className="border border-jiinf-primary text-jiinf-primary rounded-lg px-10 py-2 pr-10 bg-white appearance-none"
      >
        <option value="">Todas as Datas</option>
        {dates.map((date) => (
          <option key={date.value} value={date.value}>
            {date.label}
          </option>
        ))}
      </select>
      <CalendarIcon className="absolute top-1/2 left-3 transform -translate-y-1/2 h-5 w-5 text-jiinf-primary pointer-events-none" />
    </div>
  );
};

const TeamPicker = ({ onChange }) => {

  const [selectedTeam, setSelectedTeam] = useState('');
  const { teams } = useApi();

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
        {teams.map((Team) => (
          <option key={Team.nome} value={Team.nome}>
            {Team.nome}
          </option>
        ))}
      </select>
      <ShieldHalf className="absolute top-1/2 left-3 transform -translate-y-1/2 h-5 w-5 text-jiinf-primary pointer-events-none" />
    </div>
  );
};

export { DatePicker, TeamPicker };
