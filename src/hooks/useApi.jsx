import { Fetch } from "../api/consumer";
import { useEffect, useState } from "react";
import mediumback from "../assets/backgrounds/mediumback.png"
import mobileback from "../assets/backgrounds/mobileback.png"

const useApi = () => {

    const [teams, setTeams] = useState([]);
    const [modalities, setModalities] = useState([]);
    const [gameData, setGameData] = useState([]);
    const [sportModalities, setSportModalities] = useState([]);
    const [allPoints, setAllPoints] = useState([]);
    const [loadingHome, setLoadingHome] = useState(true);
    const [loadingTeams, setLoadingTeams] = useState(true);
    const [loadingCalendar, setLoadingCalendar] = useState(true);
    const [loadingModalities, setLoadingModalities] = useState(true);
    const [loadingSimulator, setLoadingSimulator] = useState(true);
    const [background, setBackground] = useState(null);
    const [results, setResults] = useState([]);
    const [home, setHome] = useState([]);
    const [isOnline, setIsOnline] = useState(true);
    const [isError, setIsError] = useState(false);
    const urlApi = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const updateOnlineStatus = () => {
            setIsOnline(navigator.onLine);
        };

        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);

        // Cleanup function
        return () => {
            window.removeEventListener('online', updateOnlineStatus);
            window.removeEventListener('offline', updateOnlineStatus);
        };
    }, []);
  
    //Responsivity background control
    const resposiveBack = () => {
      if (window.innerWidth >= 1024) {
        setBackground(mediumback);
      } else if (window.innerWidth >= 640) {
        setBackground(mediumback);
      } else {
        setBackground(mobileback);
      }
    };

    const fetchTeams = async () => {
      try {
        const url = new Fetch(urlApi);
        setLoadingTeams(true);
        const data = await url.GetTeams();
        setTeams(data.equipes);
      } catch (err) {
        setIsError(true);
        console.log(err);
      } finally {
        setTimeout(() => {
          setLoadingTeams(false);
        }, 1000);
      }
    };

    const fetchModalities = async () => {
      try {
        const url = new Fetch(urlApi);
        setLoadingModalities(true);
        const ax = await url.GetModalities(urlApi);
        setModalities(ax);
      } catch (err) {
        setIsError(true);
        console.log(err);
      } finally {
        setTimeout(() => {
          setLoadingModalities(false);
        }, 1000);
        
      }
    };

    const fetchResults = async () => {
      try {
        const url = new Fetch(urlApi);
        setLoadingHome(true);
        const ax = await url.GetResults();
        setResults(ax.times);
      } catch (err) {
        setIsError(true);
        console.log(err);
      } finally {
        setTimeout(() => {
          setLoadingHome(false);
          resposiveBack();
        }, 1000);
      }
    };

    const fetchHome = async () => {
      try {
        const url = new Fetch(urlApi);
        setLoadingHome(true);
        const ax = await url.GetHome();
        setHome(ax[0]);
      } catch (err) {
        setIsError(true);
        console.log(err);
      } finally {
        setTimeout(() => {
          setLoadingHome(false);            
        }, 1000);
      }
    };

    const fetchEvents = async () => {
      try {
        const url = new Fetch(urlApi);
        setLoadingCalendar(true);
        const ax = await url.GetCalendar();
        setGameData(ax);
      } catch (err) {
        setIsError(true);
        console.log(err);
      } finally {
        setTimeout(() => {
          setLoadingCalendar(false);            
        }, 1000);
      }
    };

    const fetchSimulator = async () => {
      try {
        const url = new Fetch(urlApi);
        setLoadingSimulator(true);

        //Pegando os pontos de cada time
        const ax = await url.GetAllPoints();
        setAllPoints(ax);

        const ax2 = await url.GetSimulationModalities();
        setSportModalities(ax2);

      } catch (err) {
        setIsError(true);
        console.log(err);
      } finally {
        setLoadingSimulator(false);            
      }
    };

    const UpdateVotes = async (teamId) => {
        try {
          setLoadingHome(true);
            const response = await fetch(`${urlApi}/api/v1/jiinf/times/atualizar_pontos/${teamId}/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            fetchTeams();
    
            // Verifica se a resposta não é bem-sucedida (status >= 400)
            if (!response.ok) {
                const textResponse = await response.text();
                throw new Error(`Erro: ${response.status} - ${response.statusText}`);
            }

        } catch (error) {
            setIsError(true);
            throw error;
        } finally {
          setLoadingHome(false);            
        }
    };

    const UpdateModality = async (modality) => {
      try {
        setLoadingSimulator(true);
        const response = await fetch(`${urlApi}/api/v1/jiinf/simulation/modalidade/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "modalidade_nome": modality
          }),
        });
    
        const data = await response.json();
        return data;
      } catch (error) {
        setIsError(true);
        throw error;
      } finally {
        setLoadingSimulator(false);
      }
    };    

    const ClearAll = async () => {
      try {
        setLoadingSimulator(true);
        const response = await fetch(`${urlApi}/api/v1/jiinf/simulation/limpar/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
    
        const data = await response.json();
        return data;
      } catch (error) {
        setIsError(true);
        throw error;
      } finally {
        setLoadingSimulator(false);
      }
    };    

    const UpdateClassification = async (formData) => {
      try {
        setLoadingSimulator(true);
          await fetch(`${urlApi}/api/v1/jiinf/simulation/atualizar_classificacao/`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ // Aqui você converte o objeto para JSON
                "classifica": formData.posicao,
                "nome_time": formData.time,
                "modalidade_nome": formData.modalidade,
              }),
          });
      } catch (error) {
          setIsError(true);
          throw error;
      } finally {
        setLoadingSimulator(false);            
      }
  };
  
    //Fetch infos called
    useEffect(() => {
      
      fetchTeams();
      fetchEvents();
      fetchModalities();
      fetchHome();
      fetchResults();
      fetchSimulator();

      resposiveBack();

      //Resizing event being added
      window.addEventListener('resize', resposiveBack);
  
      //Removing resizing when disassembling
      return () => {
        window.removeEventListener('resize', resposiveBack);
      };
    }, []);

    return { home, teams, results, sportModalities, ClearAll, UpdateModality, fetchSimulator, UpdateClassification, modalities, allPoints, gameData, loadingHome, loadingSimulator, loadingCalendar, loadingModalities, loadingTeams, background, isError, isOnline, UpdateVotes };
};

export default useApi;