import { useState } from 'react';

const GameCard = ({ game }) => {

  const dates = [
    { value: "1", label: '19/10/2024' },
    { value: "2", label: '20/10/2024' },
    { value: "3", label: '26/10/2024' },
    { value: "4", label: '02/11/2024' },
    { value: "5", label: '03/11/2024' },
  ];

  const date = dates.find((item) => item.value === game.data.toString());
  const dateLabel = date ? date.label : "Data não encontrada";

  return (
    <div className="w-10/12 ring-2 ring-jiinf-primary mx-auto bg-jiinf-lightskin text-white p-4 rounded-lg flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 mb-4 shadow-lg min-h-28 overflow-hidden">
      
      {/* Container para layout flexível */}
      <div className="flex flex-col md:flex-row w-full items-center">
        
        {/* Esquerda: Modalidade e Naipe */}
        <div className="flex text-xl font-semibold flex-col items-center justify-center w-full md:w-1/4 mb-4 md:mb-0">
          <div className="text-center">
            <h3 className="text-4xl font-SuperDario font-bold text-jiinf-primary">{game.modalidade.toUpperCase()}</h3>
            <p className="text-xl font-semibold text-jiinf-primary">{game.naipe}</p>
          </div>
        </div>

        {/* Middle Section: Times e Placar */}
        <div className="flex flex-col items-center justify-center flex-1 mt-4 md:mt-0 gap-2">
        <div className="text-3xl text-jiinf-primary font-bold">{game.local}</div>
        <div className="text-3xl text-jiinf-primary font-bold">{game.horario}</div>
        </div>

        {/* Direita: Info do Jogo */}
        <div className="flex flex-col mt-2 items-center justify-center w-full md:w-1/4 text-center">
          <div className="text-lg text-jiinf-primary font-bold">{dateLabel}</div>
          <div className={`px-6 py-2 rounded-lg mt-2 ${
            game.status === 'Finalizado' ? 'bg-green-500' : 'bg-jiinf-primary'
          }`}>
            {game.status === 'Finalizado' ? 'Finalizado' : 'Não iniciado'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
