import { useState, useContext, useEffect } from "react";
import APIContext from "../Context/APIContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import Residents from "../Components/Residents";

function LocationsPage() {
  const [locationInfo, setLocationInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();

  const { baseURL } = useContext(APIContext);

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

  const { name, dimension, type, residents } = locationInfo;

  useEffect(() => {
    fetchLocationPage();
  }, []);

  return (
    <>
      <div>{name}</div>
      <div>{dimension}</div>
      <div>{type}</div>
      <div>
        {residents &&
          residents.map((resident, index) => (
            <Residents resident={resident} key={index} />
          ))}
      </div>
    </>
  );
}

export default LocationsPage;
