import React, { useState } from 'react';
import { CalendarIcon } from '@heroicons/react/24/outline'; // Importa o ícone de calendário

const TeamPicker = ({ onChange }) => {
  const [selectedTeam, setSelectedTeam] = useState('');

  const Teams = [
    { value: 'Sem risadinha', label: 'Sem risadinha' },
    { value: 'Morde chinelo', label: 'Morde chinelo' },
    { value: 'Coisa ruim', label: 'Coisa ruim' },
    { value: 'Coisa asd', label: 'Coisa asd' },
  ];

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
        className="border border-gray-300 rounded-lg px-10 py-2 pr-10 bg-white appearance-none"
      >
        <option value="" disabled>Escolha uma Equipe</option>
        {Teams.map((Team) => (
          <option key={Team.value} value={Team.value}>
            {Team.label}
          </option>
        ))}
      </select>
      <CalendarIcon className="absolute top-1/2 left-3 transform -translate-y-1/2 h-5 w-5 text-jiinf-primary pointer-events-none" />
      {/* A seta do dropdown é exibida por padrão e não precisa de estilos adicionais */}
    </div>
  );
};

export default TeamPicker;
