import useApi from "../hooks/useApi";

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
    <div className="w-11/12 ring-2 ring-jiinf-primary mx-auto bg-jiinf-lightskin text-white p-4 rounded-lg flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 mb-4 shadow-lg min-h-28 overflow-hidden">
      
      <div className="flex flex-col md:flex-row w-full items-center">
        
        <div className="flex text-xl md:min-w-[100px] lg:min-w-[280px] font-semibold flex-col items-center justify-center w-full md:w-1/4 mb-4 md:mb-0">
          <div className="text-center">
            <p className="text-jiinf-primary text-lg">{game.desc}</p>
            <h3 className="text-2xl lg:text-4xl font-SuperDario text-jiinf-primary">{game.modalidade.toUpperCase()}</h3>
            <p className="text-lg font-semibold text-jiinf-primary">{game.naipe}</p>
          </div>
        </div>
  
        <div className="md:hidden w-full border-b-[1.5px] border-jiinf-primary"></div>
        <div className="hidden md:block border-l-[2px] border-jiinf-primary h-32 ml-4 mr-16"></div>
  
        <div className="flex flex-row w-full items-center justify-center mt-4">

          <div className="flex flex-col ml-4 min-w-[79px] md:ml-0 justify-center items-center text-center">
            <img src={game.TimeA.url_image} alt="Logo do Time A" className="min-w-12 h-12 md:min-w-16 md:min-h-16 rounded-full mb-1" />
            <p className="hidden sm:flex text-md md:text-lg font-semibold text-jiinf-primary">{game.TimeA.nome}</p>
          </div>
  
          {/* Seção do placar */}
          <div className='flex flex-row w-full justify-center items-center md:mx-3 lg:mx-10'>
            <p className="text-2xl text-center min-w-[42px] md:text-4xl font-bold text-jiinf-primary">{game.placarA}</p>
            <p className="text-2xl font-bold text-jiinf-primary mx-4 lg:mx-16">vs</p>
            <p className="text-2xl text-center min-w-[42px] md:text-4xl font-bold text-jiinf-primary">{game.placarB}</p>
          </div>
  
          <div className="flex flex-col mr-4 min-w-[79px] md:mr-0 justify-center items-center text-center">
            <img src={game.TimeB.url_image || hand} alt="Logo do Time B" className="min-w-12 h-12 md:min-w-16 md:min-h-16 rounded-full mb-1" />
            <p className="hidden sm:flex text-md md:text-lg font-semibold text-jiinf-primary">{game.TimeB.nome}</p>
          </div>
        </div>

        </div>
  
        <div className="md:hidden w-full border-b-[1.5px] border-jiinf-primary mt-4"></div>
        <div className="hidden md:block border-r-[2px] border-jiinf-primary h-32 ml-16 md:mr-4"></div>
  
        <div className="flex flex-col md:min-w-[100px] lg:min-w-[280px] mt-2 items-center justify-center text-center">
          <div className="lg:text-lg md:text-sm text-jiinf-primary font-bold">{game.local}</div>
          <div className="lg:text-lg md:text-sm text-jiinf-primary font-bold">{game.horario} horas</div>
          <div className="lg:text-md md:text-sm text-jiinf-primary font-semibold">{dateLabel}</div>
          <div className={`px-8 text-center md:px-4 py-2 rounded-lg mt-2 ${game.status === 'Finalizado' ? 'bg-green-500' : 'bg-jiinf-primary'}`}>
            {game.status === 'Finalizado' ? 'Finalizado' : 'Não iniciado'}
          </div>
        </div>
      </div>
  );
};

const GameCardNone = ({ game }) => {

  const { teams } = useApi();

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
    <div className="w-11/12 ring-2 ring-jiinf-primary mx-auto bg-jiinf-lightskin text-white p-4 rounded-lg flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 mb-4 shadow-lg min-h-28 overflow-hidden">
      
      <div className="flex flex-col md:flex-row w-full items-center">
        
        <div className="flex text-xl md:min-w-[100px] lg:min-w-[280px] font-semibold flex-col items-center justify-center w-full md:w-1/4 mb-4 md:mb-0">
          <div className="text-center">
            <p className="text-jiinf-primary text-lg">{game.desc}</p>
            <h3 className="text-2xl lg:text-4xl font-SuperDario text-jiinf-primary">{game.modalidade.toUpperCase()}</h3>
            <p className="text-lg font-semibold text-jiinf-primary">{game.naipe}</p>
          </div>
        </div>
  
        <div className="md:hidden w-full border-b-[1.5px] border-jiinf-primary"></div>
        <div className="hidden md:block border-l-[2px] border-jiinf-primary h-32 ml-4 mr-16"></div>
  
        <div className="flex flex-row w-full gap-8 justify-center items-center md:justify-between mt-4">

        {teams.map((team, index) => (
          <div key={index} className="flex flex-col md:w-[79px] text-center items-center"> {/* Div contêiner para os dois elementos */}
            <img 
              src={team.url_image} 
              alt="Logo time" 
              className="min-w-12 h-12 md:min-w-14 md:min-h-14 lg:min-h-16 lg:min-w-16 rounded-full mb-1" 
            />
            <p className="hidden md:flex text-md w-full lg:text-lg font-semibold text-jiinf-primary">
              {team.nome}
            </p>
          </div>
        ))}


        </div>
  
        <div className="md:hidden w-full border-b-[1.5px] border-jiinf-primary mt-4"></div>
        <div className="hidden md:block border-r-[2px] border-jiinf-primary h-32 ml-16 md:mr-4"></div>
  
        <div className="flex flex-col md:min-w-[100px] lg:min-w-[280px] mt-2 items-center justify-center text-center">
          <div className="lg:text-lg md:text-sm text-jiinf-primary font-bold">{game.local}</div>
          <div className="lg:text-lg md:text-sm text-jiinf-primary font-bold">{game.horario} horas</div>
          <div className="lg:text-md md:text-sm text-jiinf-primary font-semibold">{dateLabel}</div>
          <div className={`px-8 text-center md:px-4 py-2 rounded-lg mt-2 ${game.status === 'Finalizado' ? 'bg-green-500' : 'bg-jiinf-primary'}`}>
            {game.status === 'Finalizado' ? 'Finalizado' : 'Não iniciado'}
          </div>
        </div>
      </div>
    </div>
  );
};

export { GameCard, GameCardNone };