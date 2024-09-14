import hand from '../assets/handball.png';

const GameCard = () => {

  const Team1 = {
    logo: hand,
    score: '0',
    name: 'meu pau',
}

const Team2 = {
    logo: hand,
    score: '0',
    name: 'piru',
}

const Jogo = {
    name: 'Handeball',
    category: 'Feminino',
    team1: Team1,
    team2: Team2,
    location: 've se nao grita',
    schedule:  '19:30',
    state: 'finalizado',
}

return (
  <div className="w-10/12 ring-2 ring-white mx-auto bg-purple-700 text-white p-4 rounded-lg flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 mb-4 shadow-lg min-h-32">
    
    {/* Left Section: Sport Info */}
    <div className="flex flex-grow items-center justify-center space-x-2">
      <div className="text-3xl">🤾‍♀️</div>
      <div className="text-center">
        <h3 className="text-3xl font-semibold">Handebol</h3>
        <p className="text-xl">Feminino</p>
      </div>
    </div>

    {/* Vertical Divider */}
    <div className="hidden md:block h-auto w-1 bg-gray-300 mx-4 self-stretch"></div>
    <div className="md:hidden w-full h-px bg-gray-300"></div>

    {/* Middle Section: Teams and Score */}
    <div className="flex flex-grow items-center justify-center space-x-24">

      {/* Team 1 */}
      <div className="text-center">
        <img src={Team1.logo} alt="Team 1 Logo" className="w-16 h-16 rounded-full mx-auto mb-1 ring-2 ring-white" />
        <p className="text-lg">Sem risada</p>
        <p className="text-4xl font-bold">2</p>
      </div>

      {/* VS */}
      <p className="text-4xl font-bold">VS</p>

      {/* Team 2 */}
      <div className="text-center">
        <img src={Team2.logo} alt="Team 2 Logo" className="w-16 h-16 rounded-full mx-auto mb-1 ring-2 ring-white" />
        <p className="text-lg">Sem risada</p>
        <p className="text-4xl font-bold">4</p>
      </div>
    </div>

    {/* Vertical Divider */}
    <div className="hidden md:block h-auto w-1 bg-gray-300 mx-4 self-stretch"></div>
    <div className="md:hidden w-full h-px bg-gray-300"></div>

    {/* Right Section: Game Info */}
    <div className="flex flex-grow flex-col items-center justify-center gap-1 text-right">
      <div className="text-xl">📍 Ferreira Pacheco</div>
      <div className="text-lg">🕒 19:30</div>
      <div className={`px-6 py-2 rounded-lg mt-2 ${
        status === 'Finalizado' ? 'bg-green-500' : 'bg-gray-400'
      }`}>
        {status === 'Finalizado' ? 'Finalizado' : 'Não iniciado'}
      </div>
    </div>

  </div>
);
};

export default GameCard;
