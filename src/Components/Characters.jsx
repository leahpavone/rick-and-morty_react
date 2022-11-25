import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Characters({ character }) {
  const [characterData, setCharacterData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCharacterData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(character);
        const data = await response.data;
        // console.log(data);
        setCharacterData(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
      }
    };
    console.log("hi");

    fetchCharacterData();
  }, [character]);

  const { id, image, name } = characterData;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Link to={`/character/${id}`} className="episode-character-card-container">
      <img src={image} alt={name} className="episode-character-card-img" />
      <p className="episode-character-card-name">{name}</p>
    </Link>
  );
}

export default Characters;
