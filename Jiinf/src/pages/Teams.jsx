import { TeamCard }from "../components/Cards";
import useApi from "../hooks/useApi";

export function Teams() {
  const { teams, loading } = useApi();

  return (
    <div className="pt-8 flex flex-col w-full items-center justify-center">
      <h1 className="font-SuperDario text-6xl md:text-8xl text-jiinf-titles pb-10">PARTICIPANTES</h1>

      <div className="w-full md:px-12 lg:px-16">
        {loading ? (
          <div className="flex mt-16 justify-center items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-jiinf-primary"></div>
          </div>
        ) : (
          <div className="w-full flex justify-center items-center px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
              {teams.map((team, index) => (
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
