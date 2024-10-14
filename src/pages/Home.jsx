import goldmedal from "../assets/medals/gold-medal.png";
import silvermedal from "../assets/medals/silver-medal.png";
import bronzemedal from "../assets/medals/bronze-medal.png";
import useApi from "../hooks/useApi";
import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { SupporterBoard } from "../components/SupporterBoard";
import { Carousel } from "../components/Slider";

export function Home() {
  
  const { background, home, loadingHome, results } = useApi();
  const [ sortedTeams, setSortedTeams ] = useState([]);
  
  useEffect(() => {
    //Function to sort teams by total score
    const sortedTeamsFunc = async () => {
      if (loadingHome === false) {
        const ax = results.sort((a, b) => b.total_pontos - a.total_pontos);
        setSortedTeams(ax);
      }
    };

    sortedTeamsFunc();
  }, [loadingHome, results]);

  return (
    loadingHome ? (
      <Loading />
    ) : (
      <div className="relative min-w-screen">

        <div className="relative flex flex-col justify-center lg:justify-start items-center lg:items-start min-h-[620px] md:min-h-[700px] lg:min-h-[900px] min-w-screen rounded-lg bg-white mx-4 md:mx-8 mt-8">
          <div className="absolute rounded-lg left-0 top-0 w-full lg:w-3/5 h-full bg-jiinf-primary lg:rounded-l-lg lg:rounded-r-none">
            {/* Home image */}
            <img
              src={background}
              alt="bg-home"
              className="flex h-full rounded-lg w-full lg:rounded-r-none lg:rounded-l-lg"
            />
  
            {/* Home text */}
            <div className="absolute top-0 flex items-center justify-center text-justify">
              <h2 className="hidden lg:flex text-white text-sm xl:text-base mx-20 mt-32 font-semibold text-justify">
                {home.texto ? home.texto : ' '}
              </h2>
            </div>
          </div>
  
          <div className="absolute right-0 top-0 w-full lg:w-2/5 h-full lg:border-l-2 bg-jiinf-primary bg-opacity-80 lg:bg-opacity-100 rounded-lg lg:rounded-r-lg lg:rounded-l-none md:rounded-r-lg">
            <h2 className="text-white text-4xl md:text-5xl font-SuperDario lg:text-6xl flex mt-4 justify-center">
              CLASSIFICAÇÃO GERAL
            </h2>
  
            <div className="flex justify-between border-b-2 w-full mt-12">
              <div className="flex flex-row justify-between pb-5 md:pb-6 w-full items-center md:mx-4">
                <h2 className="flex font-SuperDario text-2xl md:text-4xl ml-4 mr-16 lg:mr-28 text-white justify-start">
                  EQUIPES
                </h2>
  
                <div className="flex w-full flex-row justify-end gap-5 lg:gap-6 mr-3 lg:mr-6">
                  {/* Icons and medals quantity */}
                  <div className="flex flex-col items-center">
                    <img src={goldmedal} alt="goldmedal" className="w-6 h-6 md:w-10 md:h-10" />
                  </div>
                  <div className="flex flex-col items-center">
                    <img src={silvermedal} alt="silvermedal" className="w-6 h-6 md:w-10 md:h-10" />
                  </div>
                  <div className="flex flex-col items-center">
                    <img src={bronzemedal} alt="bronzemedal" className="w-6 h-6 md:w-10 md:h-10" />
                  </div>
                </div>
  
                <h2 className="font-SuperDario text-2xl md:text-4xl md:min-w-[83px] text-white mr-3 lg:mr-4">
                  PONTOS
                </h2>
              </div>
            </div>
  
            {/* Teams listing */}
            <div className="flex flex-col w-full mt-4 md:mt-4">
              {Array.isArray(sortedTeams) && sortedTeams.length > 0 ? (
                sortedTeams.map((team, index) => (
                  <div
                    key={team.nome}
                    className="flex flex-row justify-start items-center ml-4 md:mx-4 mb-4 border-b border-white pb-4"
                  >
                    <h3 className="text-white font-SuperDario text-3xl md:text-4xl">{index + 1}</h3>
                    <div className="flex flex-col w-full md:w-full md:flex-row md:pl-5 h-full justify-center md:justify-start items-center">
                      <img
                        src={team.url_image}
                        alt={`${team.nome}-logo`}
                        className="flex rounded-full ring-2 ring-white min-w-10 h-10 md:w-14 md:h-14"
                      />
                      <h3 className="text-white font-SuperDario text-md md:text-xl md:ml-3">
                        {team.nome.toUpperCase()}
                      </h3>
                    </div>
  
                    <div className="flex flex-row w-full md:min-w-[155px] items-center gap-5 justify-end mr-3 md:gap-5 md:mr-3 lg:gap-6 lg:mr-7">
                      <div className="flex flex-col items-center w-6 h-6 md:w-10 md:h-10">
                        <h3 className="flex text-white font-SuperDario text-2xl md:text-4xl">
                          {team.total_medalhas.OURO}
                        </h3>
                      </div>
                      <div className="flex flex-col items-center w-6 h-6 md:w-10 md:h-10">
                        <h3 className="flex text-white font-SuperDario text-2xl md:text-4xl">
                          {team.total_medalhas.PRATA}
                        </h3>
                      </div>
                      <div className="flex flex-col items-center w-6 h-6 md:w-10 md:h-10">
                        <h3 className="flex text-white font-SuperDario text-2xl md:text-4xl">
                          {team.total_medalhas.BRONZE}
                        </h3>
                      </div>
                    </div>
  
                    <h3 className="text-white h-6 md:h-10 min-w-[55.5px] mr-3 text-center md:min-w-[83px] md:text-center font-SuperDario text-2xl md:text-4xl">
                      {team.total_pontos}
                    </h3>
                  </div>
                ))
              ) : (
                <Loading />
              )}
            </div>
          </div>
        </div>
  
        <div className="flex flex-row">
          <Carousel images={home.images_url}/>
          <SupporterBoard/>
        </div>

      </div>
    ));  
}
