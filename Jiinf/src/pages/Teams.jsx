import TeamCard from "../components/TeamCard";

export function Teams() {

  const teamData = [
    {
      title: 'Sem risada',
      description: 'O Club de Regatas Vasco da Gama, mais conhecido como Vasco, é um dos clubes mais tradicionais e populares do Brasil, com sede no Rio de Janeiro. Fundado em 1898, inicialmente como um clube de remo, o Vasco se destacou no futebol a partir da década de 1920. O time é conhecido por sua rica história de inclusão e luta contra o racismo no esporte, além de conquistas importantes como campeonatos nacionais e internacionais, incluindo o Campeonato Brasileiro e a Copa Libertadores. A torcida, chamada de "Vascaína", é apaixonada e acompanha o clube nos bons e maus momentos, mantendo o lema "O Vasco é o time da virada". O estádio do clube é o icônico São Januário.',
      imageSrc: 'https://th.bing.com/th/id/OIP.qtzNPa9LUucmC3XUoBs-BgHaHa?w=175&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7',
    },
    {
      title: 'Sem risada',
      description: 'O Club de Regatas Vasco da Gama, mais conhecido como Vasco, é um dos clubes mais tradicionais e populares do Brasil, com sede no Rio de Janeiro. Fundado em 1898, inicialmente como um clube de remo, o Vasco se destacou no futebol a partir da década de 1920. O time é conhecido por sua rica história de inclusão e luta contra o racismo no esporte, além de conquistas importantes como campeonatos nacionais e internacionais, incluindo o Campeonato Brasileiro e a Copa Libertadores. A torcida, chamada de "Vascaína", é apaixonada e acompanha o clube nos bons e maus momentos, mantendo o lema "O Vasco é o time da virada". O estádio do clube é o icônico São Januário.',
      imageSrc: 'https://th.bing.com/th/id/OIP.qtzNPa9LUucmC3XUoBs-BgHaHa?w=175&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7',
    },
    {
      title: 'Sem risada',
      description: 'O Club de Regatas Vasco da Gama, mais conhecido como Vasco, é um dos clubes mais tradicionais e populares do Brasil, com sede no Rio de Janeiro. Fundado em 1898, inicialmente como um clube de remo, o Vasco se destacou no futebol a partir da década de 1920. O time é conhecido por sua rica história de inclusão e luta contra o racismo no esporte, além de conquistas importantes como campeonatos nacionais e internacionais, incluindo o Campeonato Brasileiro e a Copa Libertadores. A torcida, chamada de "Vascaína", é apaixonada e acompanha o clube nos bons e maus momentos, mantendo o lema "O Vasco é o time da virada". O estádio do clube é o icônico São Januário.',
      imageSrc: 'https://th.bing.com/th/id/OIP.qtzNPa9LUucmC3XUoBs-BgHaHa?w=175&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7',
    },
    {
      title: 'Sem risada',
      description: 'O Club de Regatas Vasco da Gama, mais conhecido como Vasco, é um dos clubes mais tradicionais e populares do Brasil, com sede no Rio de Janeiro. Fundado em 1898, inicialmente como um clube de remo, o Vasco se destacou no futebol a partir da década de 1920. O time é conhecido por sua rica história de inclusão e luta contra o racismo no esporte, além de conquistas importantes como campeonatos nacionais e internacionais, incluindo o Campeonato Brasileiro e a Copa Libertadores. A torcida, chamada de "Vascaína", é apaixonada e acompanha o clube nos bons e maus momentos, mantendo o lema "O Vasco é o time da virada". O estádio do clube é o icônico São Januário.',
      imageSrc: 'https://th.bing.com/th/id/OIP.qtzNPa9LUucmC3XUoBs-BgHaHa?w=175&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7',
    },
  ];

    return (
        <div className="pt-12 flex flex-col w-full items-center justify-center">
          <h1 className="font-semibold text-6xl md:text-6xl text-jiinf-titles pb-16">Participantes</h1>
      
          <div className="w-full flex justify-center px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
              {teamData.map((team, index) => (
                <TeamCard
                  key={index}
                  title={team.title}
                  description={team.description}
                  imageSrc={team.imageSrc}
                />
              ))}
            </div>
          </div>


        </div>
      );
      
};