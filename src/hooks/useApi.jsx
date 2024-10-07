import { Fetch } from "../api/consumer";
import { useEffect, useState } from "react";
import mediumback from "../assets/backgrounds/mediumback.png"
import mobileback from "../assets/backgrounds/mobileback.png"

const useApi = () => {

    const [teams, setTeams] = useState([]);
    const [modalities, setModalities] = useState([]);
    const [gameData, setGameData] = useState([]);
    const [loadingHome, setLoadingHome] = useState(true);
    const [loadingTeams, setLoadingTeams] = useState(true);
    const [loadingCalendar, setLoadingCalendar] = useState(true);
    const [loadingModalities, setLoadingModalities] = useState(true);
    const [background, setBackground] = useState(null);
    const [results, setResults] = useState([]);
    const [home, setHome] = useState();
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
  
    //Fetch infos to Teams Page
    useEffect(() => {
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
  
      fetchTeams();
    }, []);
  
    //Fetch infos to Modalities Page
    useEffect(() => {
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
  
      fetchModalities();
    }, []);
  
    //Fetch infos to Home Page
    useEffect(() => {

      //Fetch infos to Classification Grid on Home Page
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

      //Fetch text to Home Page
      const fetchHome = async () => {
        try {
          const url = new Fetch(urlApi);
          setLoadingHome(true);
          const ax = await url.GetHome();
          setHome(ax[0].texto);
        } catch (err) {
          setIsError(true);
          console.log(err);
        } finally {
          setTimeout(() => {
            setLoadingHome(false);            
          }, 1000);
        }
      };
  
      fetchHome();
      fetchResults();
  
      //Resizing event being added
      window.addEventListener('resize', resposiveBack);
  
      //Removing resizing when disassembling
      return () => {
        window.removeEventListener('resize', resposiveBack);
      };

    }, []);
  
    //Fetch infos to Calendar Page
    useEffect(() => {
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
  
      fetchEvents();
    }, []);

    return { home, teams, results, modalities, gameData, loadingHome, loadingCalendar, loadingModalities, loadingTeams, background, isError, isOnline };
};

export default useApi;