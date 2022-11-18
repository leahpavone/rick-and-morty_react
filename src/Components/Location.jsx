import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Location({ characterLocation }) {
  const [locationData, setLocationData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { name, url } = characterLocation;

  const fetchLocationData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(url);
      const data = await response.data;
      console.log(data);
      setLocationData(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLocationData();
  }, []);

  return (
    <div>
      {name === "unknown" ? (
        <div className="unknown-text">unknown</div>
      ) : (
        <Link className="location-link" to={`/location/${locationData.id}`}>
          {name}
        </Link>
      )}
    </div>
  );
}

export default Location;
