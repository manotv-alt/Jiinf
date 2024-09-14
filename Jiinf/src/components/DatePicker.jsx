import React, { useState } from 'react';
import { CalendarIcon } from '@heroicons/react/24/outline'; // Importa o ícone de calendário

const DatePicker = ({ onChange }) => {
  const [selectedDate, setSelectedDate] = useState('');

  const dates = [
    { value: '2024-09-15', label: '15 de Setembro de 2024' },
    { value: '2024-09-20', label: '20 de Setembro de 2024' },
    { value: '2024-09-25', label: '25 de Setembro de 2024' }
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
        className="border border-gray-300 rounded-lg px-10 py-2 pr-10 bg-white appearance-none"
      >
        <option value="" disabled>Escolha uma data</option>
        {dates.map((date) => (
          <option key={date.value} value={date.value}>
            {date.label}
          </option>
        ))}
      </select>
      <CalendarIcon className="absolute top-1/2 left-3 transform -translate-y-1/2 h-5 w-5 text-jiinf-primary pointer-events-none" />
      {/* A seta do dropdown é exibida por padrão e não precisa de estilos adicionais */}
    </div>
  );
};

export default DatePicker;
