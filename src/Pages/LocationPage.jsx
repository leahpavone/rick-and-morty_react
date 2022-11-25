import { useState, useContext, useEffect } from "react";
import APIContext from "../Context/APIContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import Characters from "../Components/Characters";
import { LoaderPortal } from "../Components/Loader";

function LocationPage() {
  const [locationInfo, setLocationInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();

  const { baseURL } = useContext(APIContext);

  useEffect(() => {
    const fetchLocationPage = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(baseURL + `location/${id}`);
        const data = await response.data;
        // console.log(data);
        setLocationInfo(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
      }
    };
    fetchLocationPage();
  }, [baseURL, id]);

  const { name, dimension, type, residents } = locationInfo;

  if (isLoading) {
    // return <LoaderPortal />;
    return <div>Loading...</div>;
  }

  return (
    <div className="page-ctr">
      {residents && (
        <div className="episode-page">
          <div className="location-details">
            <h1 className="location-name">{name}</h1>
            <div className="location-detail">
              <div className="location-detail-label">Dimension:</div>
              <div className="location-dimension">{dimension}</div>
            </div>
            <div className="location-detail">
              <div className="location-detail-label">Type:</div>
              <div className="location-type">{type}</div>
            </div>
          </div>
          <div className="episode-characters">
            <div className="episode-characters-label">
              Residents: {residents.length}
            </div>
            <div className="episode-characters-outer-ctr">
              <div className="episode-characters-ctr">
                {residents.map((resident, index) => (
                  <Characters character={resident} key={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LocationPage;
