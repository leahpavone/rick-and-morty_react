import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Origin({ characterOrigin }) {
  const [originData, setOriginData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { name, url } = characterOrigin;

  const fetchOriginData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(url);
      const data = await response.data;
      console.log(data);
      setOriginData(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOriginData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {name === 'unknown' ? (
        <div className='unknown-text'>unknown</div>
      ) : (
        <Link className='location-link' to={`/location/${originData.id}`}>
          {name}
        </Link>
      )}
    </div>
  );
}

export default Origin;
