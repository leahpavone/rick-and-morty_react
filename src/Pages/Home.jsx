import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import APIContext from "../Context/APIContext";
import MiniCharacterCard from "../Components/MiniCharacterCard";
import SearchedCard from "../Components/SearchedCard";
import Pagination from "../Components/Pagination";
import searchIcon from "../assets/search-icon.svg";
import CharacterFilters from "../Components/CharacterFilters";

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchedName, setSearchedName] = useState("");
  const [characterData, setCharacterData] = useState(null);
  const [character, setCharacter] = useState("");
  const [identities, setIdentities] = useState([]);
  const [searched, setSearched] = useState(false);

  const { characterList, characterListInfo, baseURL } = useContext(APIContext);

  const fetchCharacterData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        baseURL + `character?name=${searchedName}`
      );
      const data = await response.data;
      setCharacterData(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setSearchedName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const mainCharacter = characterData.results.shift();
      const altIdentities = characterData.results;
      setCharacter(mainCharacter);
      setIdentities(altIdentities);
      setIsLoading(false);
      setSearched(true);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacterData();
  }, [handleSubmit]);

  return (
    <div className="container">
      {/* <div className="search-filter-ctr"> */}
      <form onSubmit={handleSubmit} className="search-ctr">
        <label htmlFor="search-input" className="search-input-label">
          Enter a Rick & Morty character
        </label>
        <div className="search-input-ctr">
          <input
            type="text"
            placeholder="Rick...Morty...Summer..."
            className="search-input"
            value={searchedName}
            onChange={handleChange}
          />
          <button type="submit" className="search-btn">
            <img src={searchIcon} alt="search icon" className="search-icon" />
          </button>
        </div>
      </form>

      <div className="filter-ctr">
        <CharacterFilters />
      </div>
      {/* </div> */}

      {!searched ? (
        <>
          <div className="characters-container">
            {characterList &&
              characterList.map((character) => (
                <Link
                  to={`/character/${character.id}`}
                  key={character.id}
                  className="mini-character-card-ctr"
                >
                  <MiniCharacterCard
                    identities={identities}
                    character={character}
                  />
                </Link>
              ))}
          </div>
          <Pagination characterList={characterList} />
        </>
      ) : (
        // AFTER SEARCH DO THIS BELOW
        <>
          <>
            <div className="result">
              <Link to={`/character/${character.id}`}>
                <SearchedCard identities={identities} character={character} />
              </Link>
            </div>
          </>
          <div className="results-ctr">
            <div className="results">
              {identities &&
                identities.map((character) => (
                  <div className="result" key={character.id}>
                    <Link to={`/character/${character.id}`}>
                      <MiniCharacterCard
                        identities={identities}
                        character={character}
                      />
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
