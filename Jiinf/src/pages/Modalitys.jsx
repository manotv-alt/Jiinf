import Slider from 'react-slick';
import { ModalityCard } from '../components/ModalityCard';

export function Modalitys() {

    const settings = {
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 520,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    const ModalitysData = [
        {
          name: 'Sem risada',
          description: 'O futebol é um esporte jogado por duas equipes de 11 jogadores, cujo objetivo é marcar gols movendo uma bola até o gol adversário, principalmente com os pés. É o esporte mais popular do mundo, com regras simples e grandes torneios, como a Copa do Mundo, que atraem milhões de fãs globalmente.',
          imageSrc: 'https://th.bing.com/th/id/OIP.qtzNPa9LUucmC3XUoBs-BgHaHa?w=175&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7',
        },
        {
          name: 'Sem risada',
          description: 'O futebol é um esporte jogado por duas equipes de 11 jogadores, cujo objetivo é marcar gols movendo uma bola até o gol adversário, principalmente com os pés. É o esporte mais popular do mundo, com regras simples e grandes torneios, como a Copa do Mundo, que atraem milhões de fãs globalmente.',
          imageSrc: 'https://th.bing.com/th/id/OIP.qtzNPa9LUucmC3XUoBs-BgHaHa?w=175&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7',
        },
        {
          name: 'Sem risada',
          description: 'O futebol é um esporte jogado por duas equipes de 11 jogadores, cujo objetivo é marcar gols movendo uma bola até o gol adversário, principalmente com os pés. É o esporte mais popular do mundo, com regras simples e grandes torneios, como a Copa do Mundo, que atraem milhões de fãs globalmente.',
          imageSrc: 'https://th.bing.com/th/id/OIP.qtzNPa9LUucmC3XUoBs-BgHaHa?w=175&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7',
        },
        {
          name: 'Sem risada',
          description: 'O futebol é um esporte jogado por duas equipes de 11 jogadores, cujo objetivo é marcar gols movendo uma bola até o gol adversário, principalmente com os pés. É o esporte mais popular do mundo, com regras simples e grandes torneios, como a Copa do Mundo, que atraem milhões de fãs globalmente.',
          imageSrc: 'https://th.bing.com/th/id/OIP.qtzNPa9LUucmC3XUoBs-BgHaHa?w=175&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7',
        },
      ];

      return (
        <div className="flex flex-col justify-center items-center h-full w-full pt-12">
            <h1 className="font-semibold text-6xl md:text-6xl text-jiinf-titles pb-16">Jiinf - II Edição</h1>
            <div className="w-full px-8 sm:px-12 md:px-12 lg:px-16">
                <Slider
                    {...settings}
                    className="flex flex-nowrap"
                >
                    {ModalitysData.map((sport, index) => (
                        <div key={index} className="flex-shrink-0 w-full justify-center items-center px-8 sm:px-16 md:px-12 lg:px-8">
                            <ModalityCard
                                name={sport.name}
                                description={sport.description}
                                imageSrc={sport.imageSrc}
                            />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}
