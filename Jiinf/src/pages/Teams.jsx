import TeamCard from "../components/TeamCard";

export function Teams() {

    return (
        <div className="pt-12 flex flex-col w-full items-center justify-center">
          <h1 className="font-semibold text-4xl md:text-6xl text-jiinf-primary pb-16">Participantes</h1>
      
          <div className="w-full p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <TeamCard
                title="TeamCard 1"
                description="Descrição do TeamCard 1"
                buttonText="Saiba Mais"
              />
              <TeamCard
                title="TeamCard 2"
                description="Descrição do TeamCard 2"
                buttonText="Saiba Mais"
              />
              <TeamCard
                title="TeamCard 3"
                description="Descrição do TeamCard 3"
                buttonText="Saiba Mais"
              />
              <TeamCard
                title="TeamCard 4"
                description="Descrição do TeamCard 4"
                buttonText="Saiba Mais"
              />
            </div>
          </div>
        </div>
      );
      
};