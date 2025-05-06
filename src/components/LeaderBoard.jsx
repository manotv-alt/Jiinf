import { useState, useEffect } from "react";
import useApi from "../hooks/useApi";
import { Loading } from "./Loading";
import { Select } from "../components/select";
import { Button } from "../components/button";

// Sample data for teams
const teamsData = [
  {
    id: "UNI",
    name: "Unificada",
    logo: "https://oogovalzsivvyrtsnesm.supabase.co/storage/v1/object/sign/Images7/unificada.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJJbWFnZXM3L3VuaWZpY2FkYS5qcGVnIiwiaWF0IjoxNzQ1OTI5NzgwLCJleHAiOjE3Nzc0NjU3ODB9.VJ8sFPK1sbYhEfmX0h-SGIQc2XcziRMXm09wAOwRZfA",
    points: 0,
  },
  {
    id: "MED",
    name: "Madrasta",
    logo: "https://oogovalzsivvyrtsnesm.supabase.co/storage/v1/object/sign/Images7/madrasta.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJJbWFnZXM3L21hZHJhc3RhLmpwZWciLCJpYXQiOjE3NDU5Mjk4NjAsImV4cCI6MTc3NzQ2NTg2MH0.rMddO-ieEddjoC7XzmggeoJ3pMDGX0zH7NH8GijDOCQ",
    points: 0,
  },
  {
    id: "MAFI",
    name: "Mafiosa",
    logo: "https://oogovalzsivvyrtsnesm.supabase.co/storage/v1/object/sign/Images7/mafiosa.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJJbWFnZXM3L21hZmlvc2EuanBlZyIsImlhdCI6MTc0NTkyOTg0MCwiZXhwIjoxNzc3NDY1ODQwfQ.oVE4qvI5bN-IDm-6hdhGKAULZUv5zV-njxb-azO83nA",
    points: 0,
  },
  {
    id: "FEF",
    name: "Sedentária",
    logo: "https://oogovalzsivvyrtsnesm.supabase.co/storage/v1/object/sign/Images7/sedentaria.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJJbWFnZXM3L3NlZGVudGFyaWEuanBlZyIsImlhdCI6MTc0NTkyOTgyNCwiZXhwIjoxNzc3NDY1ODI0fQ.t6f63smp2-AFGF6ZuPO_95-eEF4eDBuZBRmbpuHH1h8",
    points: 0,
  },
]

export function LeaderboardSimulator() {
  const [teams, setTeams] = useState(teamsData);
  const { allPoints, fetchSimulator, ClearAll, UpdateModality, loadingSimulator, sportModalities, UpdateClassification } = useApi();
  const [selectedModality, setSelectedModality] = useState("");
  const [selectedPositions, setSelectedPositions] = useState({
    UNI: "",
    MED: "",
    MAFI: "",
    FEF: ""
  });

  const initializeTeams = () => {
    // Mapeia o teamsData com os pontos atuais de allPoints, se disponíveis
    const initializedTeams = teamsData.map(team => ({
      ...team,
      points: allPoints[team.id] || team.points, // Inicializa com pontos se disponíveis
    }));
    setTeams(initializedTeams);
  };
  
  // Function to handle confirmation of results
  const handleConfirm = async () => {
    // Verifica se a modalidade foi selecionada e se todas as posições têm valor
    if (!selectedModality || Object.values(selectedPositions).includes("") || Object.values(selectedPositions).some(value => value === "" || isNaN(value))) {
      // Caso algum input esteja vazio ou inválido, você pode mostrar um alerta ou retornar
      alert("Por favor, preencha todas as posições e selecione a modalidade!");
      return;
    }

    // Criação de um novo array de times com as atualizações
    const updatedTeams = [...teams];
  
    for (let index = 0; index < updatedTeams.length; index++) {
      const team = updatedTeams[index];
  
      const formData = {
        posicao: selectedPositions[team.id], // A posição selecionada para o time
        time: team.id, // ID do time
        modalidade: selectedModality // Modalidade selecionada
      };
  
      // Atualizando a classificação para o time
      await UpdateClassification(formData);
      updatedTeams[index].points = allPoints[team.id] || '0';
    }
  
    // Atualiza as pontuações do simulador
    await fetchSimulator();
  };  

  const resetPositions = async (modality) => {    
    const updatedTeams = [...teams];
  
    // Itera por todos os times para definir a posição como 0
    for (let index = 0; index < updatedTeams.length; index++) {
      const team = updatedTeams[index];
  
      const formData = {
        posicao: '0',  // Define a posição como 0
        time: team.id, // ID do time
        modalidade: modality // Modalidade selecionada
      };
      
      // Envia a requisição para o backend para atualizar a posição
      await UpdateClassification(formData);
      updatedTeams[index].points = '0';
    }
  
    setTeams(updatedTeams);
    await fetchSimulator(); // Recarrega as informações mais recentes de pontos e modalidades
  };

  // Function to reset all modalities in parallel
  const resetAllModalityPositions = async () => {
    const confirmReset = window.confirm("Tem certeza que quer resetar todos os pontos?");
    if (confirmReset) {
      await ClearAll();
  
      setSelectedPositions({
        UNI: '0',
        MED: '0',
        MAFI: '0',
        FEF: '0'
      });

      const updatedTeams = [...teams];
  
      // Itera por todos os times para definir a posição como 0
      for (let index = 0; index < updatedTeams.length; index++) {
        updatedTeams[index].points = '0';
      }
    
      setTeams(updatedTeams);
      await fetchSimulator();
    } else {
      return;
    }
  };

  // Function to reset selections
  const resetSelections = async () => {
    // Reseta as posições no backend e no estado local
    await resetPositions(selectedModality);
  
    // Reseta as seleções no estado local
    setSelectedPositions({
      UNI: '0',
      MED: '0',
      MAFI: '0',
      FEF: '0'
    });
  };

  const handlePositionChange = (teamId, value) => {
    setSelectedPositions((prevPositions) => ({
      ...prevPositions,
      [teamId]: value
    }));
  };
  
  useEffect(() => {
    if (selectedModality) {
      const fetchModalityData = async () => {
        const data = await UpdateModality(selectedModality);
        setSelectedPositions({
          UNI: data.UNI || '0',
          MED: data.MED || '0',
          MAFI: data.MAFI || '0',
          FEF: data.FEF || '0',
        });
      };
      fetchModalityData();
    }
    
  }, [selectedModality]);

  useEffect(() => {
    if (Object.keys(allPoints).length > 0) {
      initializeTeams();
    }
  }, [allPoints]);

  // useEffect para reordenar os times quando `allPoints` muda
  useEffect(() => {
    if (Object.keys(allPoints).length > 0) {
      const updatedTeams = teams.map(team => ({
        ...team,
        points: allPoints[team.id] || team.points,  // Atualiza os pontos com o valor de allPoints
      }));
  
      // Ordena os times por pontos (decrescente)
      updatedTeams.sort((a, b) => {
        if (b.points === a.points) {
          return a.name.localeCompare(b.name); // Ordena por nome em caso de empate
        }
        return b.points - a.points;
      });
      
      setTeams(updatedTeams);  // Atualiza os times com os novos pontos
    }
  }, [allPoints]);

  return (
    loadingSimulator ? (
      <Loading />
    ) : (
    <div className="grid grid-cols-1 mb-8 md:mb-0 text-white gap-12 md:gap-16 md:grid-cols-2">
      {/* Left Panel */}
      <div className="flex flex-col space-y-6">
        {/* Sport Modality Selection */}
        <div>
          <Select
            value={selectedModality}
            onChange={setSelectedModality}
            options={sportModalities.map((modality) => ({
              value: modality,
              label: modality,
            }))}
            placeholder="Modalidades"
          />

          <h2 className="mt-6 font-semibold text-xl">Colocações :</h2>
        </div>

        {/* Place Selections */}
        {teamsData.map((team) => (
          <div key={team.id} className="flex items-center gap-3">
            <input
              min="0"
              value={selectedPositions[team.id]}
              className="bg-gray-500 text-center py-2 rounded-md px-2 w-16"
              onChange={(e) => handlePositionChange(team.id, e.target.value)}
            />
            <img
              className="relative h-9 w-9 overflow-hidden rounded-full"
              src={team.logo}
              alt={`logo-${team.id}`}
            />
            <h2 className="text-lg">{team.name}</h2>
          </div>
        ))}

        {/* Action Buttons */}
        <div className="flex pt-2 gap-4">
          <Button
            className="bg-white text-jiinf-primary transition-colors hover:bg-gray-400"
            onClick={handleConfirm}
          >
            Confirmar
          </Button>
          <Button
            className="bg-orange-500 transition-colors hover:bg-orange-600"
            onClick={resetSelections}
          >
            Resetar
          </Button>
          <Button
            className="bg-red-500 transition-colors hover:bg-red-600"
            onClick={resetAllModalityPositions}
          >
            Resetar Tudo
          </Button>
        </div>
      </div>

      {/* Right Panel - Leaderboard */}
      <div className="overflow-hidden rounded-md h-full bg-gray-800">
        <div className="bg-gray-600 p-8 text-center">
          <h2 className="text-xl font-bold">Classificação Geral</h2>
        </div>
        <div className="divide-y">
          {teams.map((team) => (
            <div key={team.id} className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <img src={team.logo} alt={`logo-${team.id}`} />
                </div>
                <span className="text-lg font-medium">{team.name}</span>
              </div>
              <div className="text-lg font-bold">{team.points} Pontos</div>
            </div>
          ))}
        </div>
      </div>
    </div>
    )
  );
}