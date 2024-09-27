import { TeamCard }from "../components/Cards";
import useApi from "../hooks/useApi";
import { Loading } from "../components/Loading";

export function Teams() {
  const { teams, loadingTeams } = useApi();

  return (
    <div className="pt-8 flex flex-col w-full items-center justify-center">
      <h1 className="font-SuperDario text-6xl md:text-7xl text-jiinf-titles pb-10">PARTICIPANTES</h1>

      <div className="w-full md:px-12 lg:px-16">
        {loadingTeams ? (
          <Loading/>
        ) : (
          <div className="w-full flex justify-center items-center px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
              {Array.isArray(teams) && teams.map((team, index) => (
                <TeamCard
                  key={index}
                  title={team.nome}
                  description={team.desc}
                  imageSrc={team.url_image}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
