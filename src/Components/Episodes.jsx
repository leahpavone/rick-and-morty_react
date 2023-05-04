import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Episodes({ episode }) {
  const [episodeData, setEpisodeData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchEpisodeData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(episode);
      const data = await response.data;
      setEpisodeData(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEpisodeData();
  }, []);

  return (
    <>
      <Link className='episode-link' to={`/episode/${episodeData.id}`}>
        {episodeData.name}
      </Link>
    </>
  );
}

export default Episodes;
