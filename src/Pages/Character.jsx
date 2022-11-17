import { useState, useContext, useEffect } from "react";
// import CharacterCard from "../Components/CharacterCard";
import APIContext from "../Context/APIContext";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function Character({ character, identities }) {
  const [pageData, setPageData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [episodeData, setEpisodeData] = useState("");

  const { id } = useParams();

  const { baseURL } = useContext(APIContext);

  const fetchCharacterPage = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(baseURL + `character/${id}`);
      const data = await response.data;
      console.log(data);
      setPageData(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  };

  console.log(pageData);

  const {
    gender,
    image,
    name,
    species,
    status,
    type,
    location,
    origin,
    episode
  } = pageData;

  const fetchEpisodeData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(baseURL + `episode/${id}`);
      const data = await response.data;
      console.log(data);
      setEpisodeData(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  };

  const handleEpisodeClick = () => {
    fetchEpisodeData();
  };

  useEffect(() => {
    fetchCharacterPage();

    // fetchEpisodeData();
  }, []);

  return (
    <div className="character-card-outer-ctr">
      <div className="character-card-ctr">
        <div className="character-card">
          {name && (
            <div className="character-card-name-ctr">
              <div className="character-card-name">{name}</div>
            </div>
          )}
          <div className="character-card-inner-ctr">
            <div className="character-card-img-ctr">
              <img src={image} alt={name} className="character-card-img" />
            </div>
            <div className="character-card-details-ctr">
              {status && (
                <div className="character-card-detail-ctr">
                  <div className="character-card-detail-label">Status:</div>
                  <div className="character-card-text">{status}</div>
                </div>
              )}

              {species && (
                <div className="character-card-detail-ctr">
                  <div className="character-card-detail-label">Species:</div>
                  <div className="character-card-text">{species}</div>
                </div>
              )}

              {type && (
                <div className="character-card-detail-ctr">
                  <div className="character-card-detail-label">Type:</div>
                  <div className="character-card-text">{type}</div>
                </div>
              )}

              {gender && (
                <div className="character-card-detail-ctr">
                  <div className="character-card-detail-label">Gender:</div>
                  <div className="character-card-text">{gender}</div>
                </div>
              )}

              {origin && (
                <div className="character-card-detail-link-ctr">
                  <div className="character-card-detail-label">Origin: </div>
                  <div className="character-card-origin-name-text">
                    {origin.name}
                  </div>
                  <div className="character-card-origin-link">{origin.url}</div>
                </div>
              )}

              {location && (
                <div className="character-card-detail-link-ctr">
                  <div className="character-card-detail-label">Location: </div>

                  <div>
                    <div className="character-card-location-name-text">
                      {location.name}
                    </div>
                    <div className="character-card-location-link">
                      {location.url}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {episode && (
            <div className="character-card-episodes-outer-ctr">
              <p className="character-card-detail-label">Episodes:</p>
              <div className="character-card-episodes-ctr">
                <div className="character-card-episodes">
                  {episode.map((ep) => (
                    <div key={ep.id}>
                      <Link
                        to={`/episode/${id}`}
                        className="character-card-episode"
                        onClick={handleEpisodeClick}
                      >
                        {ep}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Character;
