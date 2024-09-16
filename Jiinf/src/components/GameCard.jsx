import hand from '../assets/handball.png';

const GameCard = ({ game }) => {

return (
  <div className="w-10/12 ring-2 ring-jiinf-primary mx-auto bg-jiinf-lightskin text-white p-4 rounded-lg flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 mb-4 shadow-lg min-h-32">

    <div className="flex flex-grow items-center justify-center space-x-2">
      <div className="text-3xl"></div>
      <div className="text-center">
        <h3 className="text-3xl font-bold text-jiinf-primary">{game.modalidade}</h3>
        <p className="text-xl font-semibold text-jiinf-primary">{game.naipe}</p>
      </div>
    </div>

    {/* Vertical Divider */}
    <div className="hidden md:block h-auto w-1 bg-jiinf-primary mx-4 self-stretch"></div>
    <div className="md:hidden w-full h-px bg-jiinf-primary"></div>

    {/* Middle Section: Teams and Score */}
    <div className="flex flex-grow items-center justify-center space-x-24">

      {/* Team 1 */}
      <div className="text-center">
        <img src={game.TimeA.url_image || hand} alt="Team 1 Logo" className="w-16 h-16 rounded-full mx-auto mb-1 ring-2 ring-jiinf-primary" />
        <p className="text-lg font-semibold text-jiinf-primary">{game.TimeA.nome}</p>
        <p className="text-4xl font-bold text-jiinf-primary">{game.placarA}</p>
      </div>

      {/* VS */}
      <p className="text-4xl font-bold text-jiinf-primary">VS</p>

      {/* Team 2 */}
      <div className="text-center">
        <img src={game.TimeB.url_image || hand} alt="Team 2 Logo" className="w-16 h-16 rounded-full mx-auto mb-1 ring-2 ring-jiinf-primary" />
        <p className="text-lg font-semibold text-jiinf-primary">{game.TimeB.nome}</p>
        <p className="text-4xl font-bold text-jiinf-primary">{game.TimeB.placarB}</p>
      </div>
    </div>

    {/* Vertical Divider */}
    <div className="hidden md:block h-auto w-1 bg-jiinf-primary mx-4 self-stretch"></div>
    <div className="md:hidden w-full h-px bg-jiinf-primary"></div>

    {/* Right Section: Game Info */}
    <div className="flex flex-grow flex-col items-center justify-center gap-1 text-right">
      <div className="text-xl text-jiinf-primary font-bold">{game.local}</div>
      <div className="text-lg text-jiinf-primary font-bold">{game.horario}</div>
      <div className={`px-6 py-2 rounded-lg mt-2 ${
        game.status === 'Finalizado' ? 'bg-green-500' : 'bg-jiinf-primary'
      }`}>
        {game.status === 'Finalizado' ? 'Finalizado' : 'Não iniciado'}
      </div>
    </div>

  </div>
);
};

export default GameCard;
