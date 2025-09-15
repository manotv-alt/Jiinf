import { useState, useEffect } from 'react';
import { Loading } from '../components/Loading'; // Supondo que você tenha este componente
import goldmedal from '../assets/medals/gold-medal.png';
import silvermedal from '../assets/medals/silver-medal.png';
import bronzemedal from '../assets/medals/bronze-medal.png';
import useApi from '../hooks/useApi';

export default function Classification() {
    const [sortedTeams, setSortedTeams] = useState([]);
    const { results, loadingHome, loadingTeams } = useApi();

    useEffect(() => {
        if (!loadingHome && Array.isArray(results) && results.length > 0) {
            const sorted = [...results].sort((a, b) => b.total_pontos - a.total_pontos);
            setSortedTeams(sorted);
        }
    }, [loadingHome, results]);

    // Componente para a linha de estatísticas (medalhas e pontos), para evitar repetição
    const StatsRow = ({ team }) => (
        <div className="flex items-center justify-end text-white font-SuperDario text-xl md:text-2xl">
            {/* Medalhas */}
            <div className="flex items-center gap-x-3 md:gap-x-4">
                <span className="w-6 text-center">{team ? team.total_medalhas.OURO || 0 : <img src={goldmedal} alt="Ouro" className="w-6 h-6 object-cover md:w-8 md:h-8 mx-auto" />}</span>
                <span className="w-6 text-center">{team ? team.total_medalhas.PRATA || 0 : <img src={silvermedal} alt="Prata" className="w-6 h-6 object-cover md:w-8 md:h-8 mx-auto" />}</span>
                <span className="w-6 text-center">{team ? team.total_medalhas.BRONZE || 0 : <img src={bronzemedal} alt="Bronze" className="w-6 h-6 object-cover md:w-8 md:h-8 mx-auto" />}</span>
            </div>
            {/* Pontos */}
            <span className="w-16 md:w-20 text-center">{team ? team.total_pontos || 0 : 'PONTOS'}</span>
        </div>
    );

    return (
        <div className="w-full h-fit bg-gradient-to-b from-blue-950 to-jiinf-secondary ring-2 ring-white rounded-lg p-4 md:p-6 flex flex-col">
            <h2 className="text-white text-2xl md:text-4xl font-bold text-center mb-6">
                CLASSIFICAÇÃO GERAL
            </h2>

            {/* Wrapper que permite a rolagem horizontal em telas pequenas */}
            <div className="overflow-x-auto">
                {/* Conteúdo da tabela com largura mínima para forçar a rolagem quando necessário */}
                <div className="min-w-[400px] lg:min-w-full">
                    
                    {/* CABEÇALHO DA TABELA */}
                    <div className="grid grid-cols-[1fr_auto] items-center pb-3 border-b-2 border-white">
                        <h3 className="font-SuperDario text-xl ml-8 md:text-2xl text-white">EQUIPES</h3>
                        <StatsRow /> {/* Cabeçalho reutilizado para medalhas e pontos */}
                    </div>

                    {/* LISTA DE EQUIPES */}
                    <div className="mt-4 space-y-4 mb-2">
                        {loadingHome ? "" : 
                         sortedTeams.map((team, index) => (
                            <div 
                                key={team.nome} 
                                // O grid aqui usa as mesmas colunas do cabeçalho para alinhamento perfeito
                                className="grid grid-cols-[1fr_auto] items-center gap-x-4"
                            >
                                {/* Coluna 1: Posição, Imagem e Nome */}
                                <div className="flex items-center gap-x-3">
                                    <span className="text-white font-SuperDario text-2xl w-8 text-center">{index + 1}</span>
                                    <img
                                        src={team.url_image}
                                        alt={`${team.nome}-logo`}
                                        className="rounded-full ring-2 ring-white w-10 h-10 md:w-12 md:h-12"
                                    />
                                    <h3 className="text-white font-SuperDario text-base md:text-lg truncate">
                                        {team.nome.toUpperCase()}
                                    </h3>
                                </div>

                                {/* Coluna 2: Estatísticas (Medalhas e Pontos) */}
                                <StatsRow team={team} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}