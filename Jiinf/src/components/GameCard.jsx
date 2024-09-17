import hand from '../assets/handball.png';

const GameCard = ({ game }) => {

  return (
    <div className="w-10/12 ring-2 ring-jiinf-primary mx-auto bg-jiinf-lightskin text-white p-4 rounded-lg flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 mb-4 shadow-lg min-h-32 overflow-hidden">
      
      {/* Container para layout flexível */}
      <div className="flex flex-col md:flex-row w-full items-center">
        
        {/* Esquerda: Modalidade e Naipe */}
        <div className="flex flex-col items-center justify-center w-full md:w-1/4 mb-4 md:mb-0">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-jiinf-primary">{game.modalidade}</h3>
            <p className="text-xl font-semibold text-jiinf-primary">{game.naipe}</p>
          </div>
        </div>

        {/* Divider Horizontal para Telas Menores */}
        <div className="md:hidden w-full h-[2px] bg-jiinf-primary"></div>

        {/* Divider Vertical para Telas Maiores */}
        <div className="hidden md:block w-[2px] h-32 bg-jiinf-primary mx-4"></div>

        {/* Middle Section: Times e Placar */}
        <div className="flex flex-row md:flex-row items-center justify-center flex-1 mt-4 md:space-y-0 md:space-x-12 lg:space-x-24">
          {/* Time A */}
          <div className="flex h-full w-full flex-col justify-center items-center text-center mr-4">
            <img src={game.TimeA.url_image || hand} alt="Logo do Time A" className="w-16 h-16 rounded-full mx-auto mb-1 ring-2 ring-jiinf-primary" />
            <p className="text-lg font-semibold text-jiinf-primary">{game.TimeA.nome}</p>
            <p className="text-4xl font-bold text-jiinf-primary">{game.placarA}</p>
          </div>

          {/* VS */}
          <p className="flex mx-2 text-4xl font-bold text-jiinf-primary">VS</p>

          {/* Time B */}
          <div className="flex h-full w-full flex-col justify-center items-center text-center ml-4">
            <img src={game.TimeB.url_image || hand} alt="Logo do Time B" className="w-16 h-16 rounded-full mx-auto mb-1 ring-2 ring-jiinf-primary" />
            <p className="text-lg font-semibold text-jiinf-primary">{game.TimeB.nome}</p>
            <p className="text-4xl font-bold text-jiinf-primary">{game.placarB}</p>
          </div>
        </div>

        {/* Divider Horizontal para Telas Menores */}
        <div className="md:hidden w-full h-[2px] bg-jiinf-primary mt-4"></div>

        {/* Divider Vertical para Telas Maiores */}
        <div className="hidden md:block w-[2px] h-32 bg-jiinf-primary mx-4"></div>

        {/* Direita: Info do Jogo */}
        <div className="flex flex-col mt-2 items-center justify-center w-full md:w-1/4 text-center">
          <div className="text-xl text-jiinf-primary font-bold">{game.local}</div>
          <div className="text-lg text-jiinf-primary font-bold">{game.horario}</div>
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
