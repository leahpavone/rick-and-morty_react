import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import APIContext from '../Context/APIContext';
import MiniCharacterCard from '../Components/MiniCharacterCard';
import Pagination from '../Components/Pagination';
import searchIcon from '../assets/search-icon.svg';
import CharacterFilters from '../Components/CharacterFilters';
import { Loader } from '../Components/Loader';

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchedName, setSearchedName] = useState('');
  const [characterData, setCharacterData] = useState(null);
  const [character, setCharacter] = useState('');
  const [identities, setIdentities] = useState([]);
  const [searched, setSearched] = useState(false);
  const [searchedData, setSearchedData] = useState(false);

  const { characterList, baseURL } = useContext(APIContext);

  const handleChange = (e) => {
    setSearchedName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const mainCharacter = characterData.results.shift();
      const altIdentities = characterData.results;
      setSearchedData(searchedName);
      setCharacter(mainCharacter);
      setIdentities(altIdentities);
      setSearched(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const fetchCharacterData = async () => {
      try {
        const response = await axios.get(
          baseURL + `character?name=${searchedName}`
        );
        const data = await response.data;
        setCharacterData(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchCharacterData();
    if (!characterData) {
      console.log('no character data');
    }
  }, [characterData, baseURL, searchedName]);

  return (
    <div className='home-ctr'>
      <Loader />
      <div className='container'>
        <h4 className='search-heading'>Enter a Rick And Morty Character</h4>
        <div className='search-filter-ctr'>
          {!searched && <CharacterFilters className='filter-ctr' />}

          <form onSubmit={handleSubmit} className='form-ctr'>
            <div className='search-input-ctr'>
              <input
                type='text'
                placeholder='Rick...Morty...Summer...'
                className='search-input'
                value={searchedName}
                onChange={handleChange}
              />
              <button type='submit' className='search-btn'>
                <img
                  src={searchIcon}
                  alt='search icon'
                  className='search-icon'
                />
              </button>
            </div>
          </form>
        </div>

        {!searched ? (
          <>
            <div className='characters-container'>
              {characterList &&
                characterList.map((character) => (
                  <Link
                    to={`/character/${character.id}`}
                    key={character.id}
                    className='mini-character-card-ctr'>
                    <MiniCharacterCard character={character} />
                  </Link>
                ))}
            </div>
            <Pagination characterList={characterList} />
          </>
        ) : (
          // AFTER SEARCH DO THIS BELOW
          <>
            <>
              <div className='results-count'>
                <p>
                  {identities.length} results for "{searchedData}"
                </p>
              </div>
              <div className='result'>
                <Link
                  to={`/character/${character.id}`}
                  className='searched-card-ctr'>
                  <div character={character}>
                    <img
                      src={character.image}
                      alt={character.name}
                      className='searched-card-img'
                    />
                    <p className='searched-card-name'>{character.name}</p>
                  </div>
                </Link>
              </div>
            </>
            <div className='results-ctr'>
              <div className='results'>
                {identities &&
                  identities.map((character) => (
                    <div key={character.id}>
                      <Link
                        to={`/character/${character.id}`}
                        className='result'>
                        <MiniCharacterCard character={character} />
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
