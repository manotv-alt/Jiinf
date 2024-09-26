import goldmedal from "../assets/medals/gold-medal.png";
import silvermedal from "../assets/medals/silver-medal.png";
import bronzemedal from "../assets/medals/bronze-medal.png";
import useApi from "../hooks/useApi";

export function Home() {
  
  const { background, home, loading, results } = useApi();
  const sortedTeams = results.sort((a, b) => b.total_pontos - a.total_pontos);

  return (
    <div className="w-full">
      {loading ? (
        <div className="flex mt-16 justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-jiinf-primary"></div>
        </div>
      ) : (
        <div className="relative flex flex-col justify-center items-center min-h-screen min-w-screen rounded-lg bg-white mx-4 md:mx-8 mt-8">
          <img 
            src={background} 
            alt="bg-home"
            className="flex min-h-screen min-w-screen rounded-lg"
          />

          <div className="hidden lg:flex h-full mt-32 mx-16 absolute">
            <p className="flex w-1/2 h-full items-start text-center text-white">{home}</p>
          </div>

          <div className="absolute right-0 top-0 w-full lg:w-2/5 h-full bg-jiinf-primary bg-opacity-75 rounded-r-lg rounded-l-lg ">
            <h2 className="text-white text-4xl md:text-5xl font-SuperDario lg:text-6xl flex mt-4 justify-center">CLASSIFICAÇÃO GERAL</h2>

            <div className="flex justify-between w-full mt-12">
              <div className="flex flex-row justify-between w-full items-center">
                <h2 className="flex font-SuperDario text-2xl md:text-4xl ml-4 mr-16 lg:mr-28 text-white justify-start">EQUIPES</h2>

                <div className="flex w-full flex-row justify-end gap-5 lg:gap-5 mr-3 lg:mr-6">
                  {/* Ícones e quantidade de medalhas */}
                  <div className="flex flex-col items-center">
                    <img src={goldmedal} alt="goldmedal" className="w-6 h-6 md:w-9 md:h-9"/>
                  </div>
                  <div className="flex flex-col items-center">
                    <img src={silvermedal} alt="silvermedal" className="w-6 h-6 md:w-9 md:h-9"/>
                  </div>
                  <div className="flex flex-col items-center">
                    <img src={bronzemedal} alt="bronzemedal" className="w-6 h-6 md:w-9 md:h-9"/>
                  </div>
                </div>

                <h2 className="font-SuperDario text-2xl md:text-4xl text-white mr-3 lg:mr-4">Pontos</h2>
              </div>
            </div>

            {/* Listagem das equipes */}
            <div className="flex flex-col w-full mt-8">
              {sortedTeams.map((team, index) => (
                <div key={team.id} className="flex flex-row justify-between items-center mx-4 mb-4 border-b border-white pb-4">
                  <h3 className="text-white font-SuperDario text-3xl md:text-4xl">{index + 1}</h3>
                  <div className="flex flex-col min-w-[100px] md:w-full md:flex-row pl-5 h-full justify-center md:justify-start items-center">
                    <img src={team.url_image} alt={`${team.nome}-logo`} className="flex min-w-12 h-12 lg:w-16 lg:h-16"/>
                    <h3 className="text-white font-SuperDario text-md md:text-2xl md:ml-3">{team.nome.toUpperCase()}</h3>
                  </div>
                  
                  <div className="flex w-full flex-row items-center justify-end gap-9 mr-10 md:gap-12 md:mr-12 lg:gap-12 lg:mr-16">
                    <div className="text-center">
                      <h3 className="text-white font-SuperDario text-2xl md:text-4xl">{team.total_medalhas.OURO}</h3>
                    </div>
                    <div className="text-center">
                      <h3 className="text-white font-SuperDario text-2xl md:text-4xl">{team.total_medalhas.PRATA}</h3>
                    </div>
                    <div className="text-center">
                      <h3 className="text-white font-SuperDario text-2xl md:text-4xl">{team.total_medalhas.BRONZE}</h3>
                    </div>
                  </div>

                  <h3 className="text-white min-w-[10px] max-w-[10px] mr-5 md:mr-8 md:ml-2 font-SuperDario text-2xl md:text-4xl">{team.total_pontos}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
