import { Fetch } from "../api/consumer";
import { useEffect, useState } from "react";
import largeback from "../assets/backgrounds/largeback.png"
import mediumback from "../assets/backgrounds/mediumback.png"
import mobileback from "../assets/backgrounds/mobileback.png"

const useApi = () => {

    const [teams, setTeams] = useState([]);
    const [modalitys, setModalitys] = useState([]);
    const [gameData, setGameData] = useState([]);
    const [loadingHome, setLoadingHome] = useState(true);
    const [loadingTeams, setLoadingTeams] = useState(true);
    const [loadingCalendar, setLoadingCalendar] = useState(true);
    const [loadingModalitys, setLoadingModalitys] = useState(true);
    const [error, setError] = useState(null);
    const [background, setBackground] = useState(null);
    const [results, setResults] = useState([]);
    const [home, setHome] = useState();
    const urlApi = import.meta.env.VITE_API_URL;
  
    const resposiveBack = () => {
      if (window.innerWidth >= 1024) {
        setBackground(mediumback); // Para telas grandes
      } else if (window.innerWidth >= 640) {
        setBackground(mediumback); // Para telas médias
      } else {
        setBackground(mobileback); // Para telas pequenas
      }
    };
  
    useEffect(() => {
      const fetchTeams = async () => {
        try {
          const url = new Fetch(urlApi);
          setLoadingTeams(true);
          const data = await url.GetEquipes();
          setTeams(data.equipes);
        } catch (err) {
          console.log(err);
        } finally {
          setLoadingTeams(false);
        }
      };
  
      fetchTeams();
    }, []);
  
    useEffect(() => {
      const fetchModalities = async () => {
        try {
          const url = new Fetch(urlApi);
          setLoadingModalitys(true);
          const ax = await url.GetModalidades(urlApi);
          setModalitys(ax);
        } catch (err) {
          console.log(err)
        } finally {
          setLoadingModalitys(false);
        }
      };
  
      fetchModalities();
    }, []);
  
    useEffect(() => {
      const fetchResultados = async () => {
        try {
          const url = new Fetch(urlApi);
          setLoadingHome(true);
          const ax = await url.GetResultados();
          setResults(ax.times);
        } catch (err) {
          console.log(err);
        } finally {
          setLoadingHome(false);
          resposiveBack();
        }
      };
  
      fetchResultados();
  
      window.addEventListener('resize', resposiveBack); // Adiciona o evento de resize
  
      return () => {
        window.removeEventListener('resize', resposiveBack); // Limpa o evento ao desmontar
      };

    }, []);
  
    useEffect(() => {
      const fetchEventos = async () => {
        try {
          const url = new Fetch(urlApi);
          setLoadingCalendar(true);
          const ax = await url.GetEventos();
          setGameData(ax);
        } catch (err) {
          console.log(err);
        } finally {
          setLoadingCalendar(false);
        }
      };
  
      fetchEventos();
    }, []);
  
    useEffect(() => {
      const fetchHome = async () => {
        try {
          const url = new Fetch(urlApi);
          setLoadingHome(true);
          const ax = await url.GetHome();
          setHome(ax[0].texto);
        } catch (err) {
          console.log(err);
        } finally {
          setLoadingHome(false);
        }
      };
  
      fetchHome();
    }, []);

    return { home, teams, results, modalitys, gameData, loadingHome, loadingCalendar, loadingModalitys, loadingTeams, error, background };
};

export default useApi;