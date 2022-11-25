import { useState, useContext, useEffect } from "react";
import APIContext from "../Context/APIContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import { LoaderPortal } from "../Components/Loader";
import Residents from "../Components/Characters";

function EpisodePage() {
  const [episodeInfo, setEpisodeInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();

  const { baseURL } = useContext(APIContext);

  useEffect(() => {
    const fetchEpisodePage = async () => {
      try {
        const response = await axios.get(baseURL + `episode/${id}`);
        const data = await response.data;
        console.log(data);
        setEpisodeInfo(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchEpisodePage();
  }, [baseURL, id]);

  const { name, air_date, episode, characters } = episodeInfo;

  if (isLoading) {
    // return <LoaderPortal />;
    return <div>Loading...</div>;
  }

  return (
    <div className="page-ctr">
      <div className="episode-page">
        <div className="episode-details">
          <h1 className="episode-name">{name}</h1>
          <div className="episode-date">Air Date: {air_date}</div>
          <div className="season-episode-ctr">
            {episode && (
              <>
                <div className="season">Season {episode.slice(1, 3)}</div>
                <div className="episode">Episode {episode.slice(4)}</div>
              </>
            )}
          </div>
        </div>
        <div className="episode-characters">
          <div className="episode-characters-label">
            Characters: {characters.length}
          </div>
          <div className="episode-characters-outer-ctr">
            <div className="episode-characters-ctr">
              {characters &&
                characters.map((character, index) => (
                  <Residents character={character} key={index} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EpisodePage;
