import { Fetch } from "../api/consumer";
import { useEffect, useState } from "react";
import mediumback from "../assets/backgrounds/mediumback.png"
import mobileback from "../assets/backgrounds/mobileback.png"

// Introduce small client-side cache + request deduplication to avoid many network calls when multiple components mount
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const API_TIMEOUT = 10000; // 10s

const inMemoryCache = {
  teams: null,
  modalities: null,
  results: null,
  home: null,
  simulator: null
};

const ongoingFetch = {
  teams: null,
  modalities: null,
  results: null,
  home: null,
  simulator: null
};

const getFromLocal = (key) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const { data, timestamp } = JSON.parse(raw);
    if (Date.now() - timestamp < CACHE_DURATION) return data;
    return null;
  } catch (e) {
    return null;
  }
};

const setLocal = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
  } catch (e) {
    // ignore quota errors
  }
};

const fetchWithTimeout = async (promiseFactory, timeout = API_TIMEOUT) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  try {
    const result = await promiseFactory(controller.signal);
    clearTimeout(timeoutId);
    return result;
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
};

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

    const handleError = (err) => {
      console.error(err);
      setIsError(true);
      if (!navigator.onLine) setIsOnline(false);
    };

    const fetchTeams = async () => {
      // deduplicate: if there's data in memory, use it; if there's an ongoing fetch, await it
      try {
        setLoadingTeams(true);

        if (inMemoryCache.teams) {
          setTeams(inMemoryCache.teams);
          return inMemoryCache.teams;
        }

        const local = getFromLocal('teams');
        if (local) {
          inMemoryCache.teams = local;
          setTeams(local);
          return local;
        }

        if (ongoingFetch.teams) {
          const data = await ongoingFetch.teams;
          setTeams(data);
          return data;
        }

        const api = new Fetch(urlApi);
        ongoingFetch.teams = fetchWithTimeout(async (signal) => {
          // consumer methods are expected to ignore signal; if needed modify consumer
          const d = await api.GetTeams();
          return d && d.equipes ? d.equipes : [];
        });

        const equipes = await ongoingFetch.teams;
        inMemoryCache.teams = equipes;
        setLocal('teams', equipes);
        setTeams(equipes);
        ongoingFetch.teams = null;
        return equipes;
      } catch (err) {
        ongoingFetch.teams = null;
        handleError(err);
        return [];
      } finally {
        setLoadingTeams(false);
      }
    };

    const fetchModalities = async () => {
      try {
        setLoadingModalities(true);

        if (inMemoryCache.modalities) {
          setModalities(inMemoryCache.modalities);
          return inMemoryCache.modalities;
        }

        const local = getFromLocal('modalities');
        if (local) {
          inMemoryCache.modalities = local;
          setModalities(local);
          return local;
        }

        if (ongoingFetch.modalities) {
          const data = await ongoingFetch.modalities;
          setModalities(data);
          return data;
        }

        const api = new Fetch(urlApi);
        ongoingFetch.modalities = fetchWithTimeout(async (signal) => {
          const ax = await api.GetModalities(urlApi);
          return ax || [];
        });

        const ax = await ongoingFetch.modalities;
        inMemoryCache.modalities = ax;
        setLocal('modalities', ax);
        setModalities(ax);
        ongoingFetch.modalities = null;
        return ax;
      } catch (err) {
        ongoingFetch.modalities = null;
        handleError(err);
        return [];
      } finally {
        setLoadingModalities(false);
      }
    };

    const fetchResults = async () => {
      try {
        setLoadingHome(true);

        if (inMemoryCache.results) {
          setResults(inMemoryCache.results);
          resposiveBack();
          return inMemoryCache.results;
        }

        const local = getFromLocal('results');
        if (local) {
          inMemoryCache.results = local;
          setResults(local);
          resposiveBack();
          return local;
        }

        if (ongoingFetch.results) {
          const data = await ongoingFetch.results;
          setResults(data);
          resposiveBack();
          return data;
        }

        const api = new Fetch(urlApi);
        ongoingFetch.results = fetchWithTimeout(async (signal) => {
          const ax = await api.GetResults();
          return ax && ax.times ? ax.times : [];
        });

        const ax = await ongoingFetch.results;
        inMemoryCache.results = ax;
        setLocal('results', ax);
        setResults(ax);
        ongoingFetch.results = null;
        resposiveBack();
        return ax;
      } catch (err) {
        ongoingFetch.results = null;
        handleError(err);
        resposiveBack();
        return [];
      } finally {
        setLoadingHome(false);
      }
    };

    const fetchHome = async () => {
      try {
        setLoadingHome(true);

        if (inMemoryCache.home) {
          setHome(inMemoryCache.home);
          return inMemoryCache.home;
        }

        const local = getFromLocal('home');
        if (local) {
          inMemoryCache.home = local;
          setHome(local);
          return local;
        }

        if (ongoingFetch.home) {
          const data = await ongoingFetch.home;
          setHome(data);
          return data;
        }

        const api = new Fetch(urlApi);
        ongoingFetch.home = fetchWithTimeout(async (signal) => {
          const ax = await api.GetHome();
          return Array.isArray(ax) ? (ax[0] || {}) : ax || {};
        });

        const ax = await ongoingFetch.home;
        inMemoryCache.home = ax;
        setLocal('home', ax);
        setHome(ax);
        ongoingFetch.home = null;
        return ax;
      } catch (err) {
        ongoingFetch.home = null;
        handleError(err);
        return {};
      } finally {
        setLoadingHome(false);
      }
    };

    const fetchEvents = async () => {
      try {
        setLoadingCalendar(true);
        const api = new Fetch(urlApi);
        const ax = await api.GetCalendar();
        setGameData(ax || []);
      } catch (err) {
        handleError(err);
      } finally {
        setLoadingCalendar(false);
      }
    };

    const fetchSimulator = async () => {
      try {
        setLoadingSimulator(true);

        //Pegando os pontos de cada time
        const api = new Fetch(urlApi);
        const ax = await api.GetAllPoints();
        setAllPoints(ax || []);

        const ax2 = await api.GetSimulationModalities();
        setSportModalities(ax2 || []);
      } catch (err) {
        handleError(err);
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

            // Se requisição falhar, lança erro e NÃO atualiza o frontend
            if (!response.ok) {
                const textResponse = await response.text();
                setIsError(true);
                throw new Error(`Erro: ${response.status} - ${response.statusText} - ${textResponse}`);
            }

            // Atualiza o estado somente após confirmação de sucesso
            setTeams(prev => {
              const updated = prev.map(t => t.time_id === teamId ? { ...t, total_votos: (t.total_votos || 0) + 1 } : t);
              inMemoryCache.teams = updated;
              return updated;
            });

            // refresh teams from server in background but don't block UI
            fetchTeams().catch(() => {});

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
  
    //Fetch infos called once per hook instance but deduplicated via inMemory + ongoingFetch
    useEffect(() => {
      const fetchAllData = async () => {
        try {
          await Promise.all([
            fetchTeams(),
            fetchEvents(),
            fetchModalities(),
            fetchHome(),
            fetchResults(),
            fetchSimulator()
          ]);
        } catch (error) {
          setIsError(true);
          console.error('Error fetching data:', error);
        }
      };

      fetchAllData();
      resposiveBack();

      window.addEventListener('resize', resposiveBack);
      return () => {
        window.removeEventListener('resize', resposiveBack);
      };
    }, []);

    return { home, teams, results, sportModalities, ClearAll, UpdateModality, fetchSimulator, UpdateClassification, modalities, allPoints, gameData, loadingHome, loadingSimulator, loadingCalendar, loadingModalities, loadingTeams, background, isError, isOnline, UpdateVotes };
};

export default useApi;