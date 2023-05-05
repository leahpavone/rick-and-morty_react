import { useState, useContext, useEffect } from 'react';
import APIContext from '../Context/APIContext';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Episodes from '../Components/Episodes';
import Location from '../Components/Location';
import Origin from '../Components/Origin';
import { LoaderPortal } from '../Components/Loader';

function Character({ character, identities }) {
  const [pageData, setPageData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [episodes, setEpisodes] = useState([]);
  const [characterOrigin, setCharacterOrigin] = useState('');
  const [characterLocation, setCharacterLocation] = useState('');

  const { id } = useParams();

  const { baseURL } = useContext(APIContext);

  const fetchCharacterPage = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(baseURL + `character/${id}`);
      const data = await response.data;
      setPageData(data);
      setEpisodes(data.episode);
      setCharacterOrigin(data.origin);
      setCharacterLocation(data.location);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  };

  const { gender, image, name, species, status, type } = pageData;

  useEffect(() => {
    fetchCharacterPage();
  }, []);

  if (isLoading) {
    return <LoaderPortal />;
    // return <div>Loading...</div>;
  }

  return (
    <div className='character-page'>
      <div className='character-card'>
        <div className='character-card-name-img-ctr'>
          {name && <div className='character-card-name'>{name}</div>}
          <div className='character-card-img-ctr'>
            <img src={image} alt={name} className='character-card-img' />
          </div>
        </div>

        <div className='all-details-ctr'>
          <div className='character-card-details-ctr'>
            {status && (
              <div className='character-card-detail-ctr'>
                <div className='character-card-detail-label'>Status:</div>
                <div className='character-card-text'>{status}</div>
              </div>
            )}

            {species && (
              <div className='character-card-detail-ctr'>
                <div className='character-card-detail-label'>Species:</div>
                <div className='character-card-text'>{species}</div>
              </div>
            )}

            {type && (
              <div className='character-card-detail-ctr'>
                <div className='character-card-detail-label'>Type:</div>
                <div className='character-card-text'>{type}</div>
              </div>
            )}

            {gender && (
              <div className='character-card-detail-ctr'>
                <div className='character-card-detail-label'>Gender:</div>
                <div className='character-card-text'>{gender}</div>
              </div>
            )}

            {characterOrigin && (
              <div className='character-card-detail-link-ctr'>
                <div className='character-card-detail-label'>Origin: </div>
                <Origin characterOrigin={characterOrigin} />
              </div>
            )}

            {characterLocation && (
              <div className='character-card-detail-link-ctr'>
                <div className='character-card-detail-label'>Location: </div>
                <Location characterLocation={characterLocation} />
              </div>
            )}
          </div>

          {episodes && (
            <div className='character-episodes'>
              <p className='character-card-episode-label'>
                <div>Episodes:</div>
                <div>{episodes.length}</div>
              </p>
              <div className='character-card-episodes-ctr'>
                <div className='character-card-episodes'>
                  {episodes.map((episode, index) => (
                    <Episodes episode={episode} key={index} />
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
