import { useState, useContext, useEffect } from "react";
import APIContext from "../Context/APIContext";
import axios from "axios";
import { useParams } from "react-router-dom";

function Episode() {
  const [episodeData, setEpisodeData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();

  const { baseURL } = useContext(APIContext);

  const fetchEpisodePage = async () => {
    setIsLoading(true);
    const response = await axios.get(baseURL + `episode/${id}`);
    const data = await response.data;
    // console.log(data);
    setEpisodeData(data);
    setIsLoading(false);

    try {
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEpisodePage();
    // console.log(episodeData);
  }, []);

  const { name, air_date, episode, characters } = episodeData;

  return <div>{name}</div>;
}

export default Episode;
