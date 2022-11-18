import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MiniCharacterCard from "./MiniCharacterCard";

function EpisodeCharacters({ character }) {
  const [episodeCharacterData, setEpisodeCharacterData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchEpisodeCharcterData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(character);
      const data = await response.data;
      console.log(data);
      setEpisodeCharacterData(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEpisodeCharcterData();
  }, []);
  return (
    <div className="residents-ctr">
      <Link to={`/character/${episodeCharacterData.id}`}>
        <MiniCharacterCard character={episodeCharacterData} />
      </Link>
    </div>
  );
}

export default EpisodeCharacters;
