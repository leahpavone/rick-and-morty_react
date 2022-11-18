import { useState, useContext, useEffect } from "react";
import APIContext from "../Context/APIContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import EpisodeCharacters from "../Components/EpisodeCharacters";

function EpisodePage() {
  const [episodeInfo, setEpisodeInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();

  const { baseURL } = useContext(APIContext);

  const fetchEpisodePage = async () => {
    setIsLoading(true);
    const response = await axios.get(baseURL + `episode/${id}`);
    const data = await response.data;
    // console.log(data);
    setEpisodeInfo(data);
    setIsLoading(false);

    try {
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEpisodePage();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const { name, air_date, episode, characters } = episodeInfo;

  return (
    <div className="episode-page">
      <h1 className="episode-name">{name}</h1>
      <div className="episode-date">{air_date}</div>
      <div className="season-episode-ctr">
        {episode && (
          <>
            <div className="season">Season {episode.slice(1, 3)}</div>
            <div className="episode">Episode {episode.slice(4)}</div>
          </>
        )}
      </div>
      <div className="episode-characters-label">Characters:</div>
      <div className="episode-characters-outer-ctr">
        <div className="episode-characters-ctr">
          {characters &&
            characters.map((character, index) => (
              <EpisodeCharacters character={character} key={index} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default EpisodePage;
