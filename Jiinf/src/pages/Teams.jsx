import { useEffect, useState } from "react";
import TeamCard from "../components/TeamCard";
import { Fetch } from "../api/consumer";

export function Teams() {

  const [teams, setTeams] = useState([[]]);

  useEffect (() => {

      async function bla () {
          try {
          const url = new Fetch ("https://jiinf.vercel.app");
          const ax = await url.GetEquipes();
          setTeams(ax);
  
          } catch(error) {
              console.log(error);
          }
          
      }

      bla();

  }, [])

  console.log(teams);

    return (
        <div className="pt-12 flex flex-col w-full items-center justify-center">
          <h1 className="font-semibold text-6xl md:text-6xl text-jiinf-titles pb-16">Participantes</h1>
      
          <div className="w-full flex justify-center px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
              {/*teams.map((team, index) => (
                <TeamCard
                  key={index}
                  title={team.nome}
                  description={team.desc}
                  imageSrc={team.url_image}
                />
              ))*/}
            </div>
          </div>


        </div>
      );
      
};