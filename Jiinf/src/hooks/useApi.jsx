import { Fetch } from "../api/consumer";
import { useEffect, useState } from "react";
import largeback from "../assets/backgrounds/largeback.png"
import mediumback from "../assets/backgrounds/mediumback.png"
import mobileback from "../assets/backgrounds/mobileback.png"

const useApi = () => {

    const [teamsData, setTeamsData] = useState(null);
    const [teams, setTeams] = useState([]);
    const [modalitys, setModalitys] = useState([]);
    const [gameData, setGameData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [background, setBackground] = useState(null);
    const [results, setResults] = useState([]);
    const [home, setHome] = useState();
  
    const resposiveBack = () => {
      if (window.innerWidth >= 1024) {
        setBackground(largeback); // Para telas grandes
      } else if (window.innerWidth >= 640) {
        setBackground(mediumback); // Para telas médias
      } else {
        setBackground(mobileback); // Para telas pequenas
      }
    };
  
    useEffect(() => {
      const fetchTeams = async () => {
        try {
          const url = new Fetch("https://jiinf.vercel.app");
          const data = await url.GetEquipes();
          setTeams(data.equipes);
        } catch (err) {
          setError(err);
          console.log(err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchTeams();
    }, []);
  
    useEffect(() => {
      const fetchModalities = async () => {
        try {
          const url = new Fetch("https://jiinf.vercel.app");
          const ax = await url.GetModalidades();
          setModalitys(ax);
        } catch (err) {
          setError(err);
          console.log(err);
        } finally {
          setLoading((prevLoading) => prevLoading && false);
        }
      };
  
      fetchModalities();
    }, []);
  
    useEffect(() => {
      const fetchResultados = async () => {
        try {
          const url = new Fetch("https://jiinf.vercel.app");
          const ax = await url.GetResultados();
          setResults(ax.times);
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
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
          const url = new Fetch("https://jiinf.vercel.app");
          const ax = await url.GetEventos();
          setGameData(ax);
          setLoading(true);
        } catch (err) {
          console.log(err);
          setLoading(true);
        } finally {
          setLoading(false);
        }
      };
  
      fetchEventos();
    }, []);
  
    useEffect(() => {
      const fetchHome = async () => {
        try {
          const url = new Fetch("https://jiinf.vercel.app");
          const ax = await url.GetHome();
          setHome(ax[0].texto);
          console.log(home);
          setLoading(true);
        } catch (err) {
          console.log(err);
          setLoading(true);
        } finally {
          setLoading(false);
        }
      };
  
      fetchHome();
    }, []);

    return { home, teamsData, teams, results, modalitys, gameData, loading, error, background };
};

export default useApi;