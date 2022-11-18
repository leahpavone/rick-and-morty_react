import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MiniCharacterCard from "./MiniCharacterCard";

function Residents({ resident }) {
  const [residentData, setResidentData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchResidentData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(resident);
      const data = await response.data;
      console.log(data);
      setResidentData(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchResidentData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="residents-ctr">
      <Link to={`/character/${residentData.id}`}>
        <MiniCharacterCard character={residentData} />
      </Link>
    </div>
  );
}

export default Residents;
