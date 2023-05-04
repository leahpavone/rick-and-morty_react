import { useContext, useState, useRef } from 'react';
import axios from 'axios';
import APIContext from '../Context/APIContext';

function CharacterFilters() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    baseURL,
    setCharacterList,
    pageNumber,
    setPageNumber,
    setPages,
    filter,
    setFilter,
    fetchAllCharacters
  } = useContext(APIContext);

  const select = useRef();

  const filterCharacters = async (e) => {
    setIsLoading(true);
    try {
      if (e.target.value === 'male') {
        setFilter('male');
        const response = await axios.get(
          baseURL + `character?page=${pageNumber}&gender=male`
        );
        const data = await response.data;
        console.log(data.info);
        setCharacterList(data.results);
        const [, ...result] = Array(data.info.pages + 1).keys();
        setPages(result);
        setPageNumber(result[0]);
      }
      if (e.target.value === 'female') {
        setFilter('female');
        const response = await axios.get(
          baseURL + `character?page=${pageNumber}&gender=female`
        );
        const data = await response.data;
        console.log(data.info);
        setCharacterList(data.results);
        const [, ...result] = Array(data.info.pages + 1).keys();
        setPages(result);
        setPageNumber(result[0]);
      }
      if (e.target.value === 'genderless') {
        setFilter('genderless');
        const response = await axios.get(
          baseURL + `character?page=${pageNumber}&gender=genderless`
        );
        const data = await response.data;
        console.log(data.info);
        setCharacterList(data.results);
        const [, ...result] = Array(data.info.pages + 1).keys();
        setPages(result);
        setPageNumber(result[0]);
      }
      if (e.target.value === 'alive') {
        setFilter('alive');
        const response = await axios.get(
          baseURL + `character?page=${pageNumber}&status=alive`
        );
        const data = await response.data;
        console.log(data.info);
        setCharacterList(data.results);
        const [, ...result] = Array(data.info.pages + 1).keys();
        setPages(result);
        setPageNumber(result[0]);
      }
      if (e.target.value === 'dead') {
        setFilter('dead');
        const response = await axios.get(
          baseURL + `character?page=${pageNumber}&status=dead`
        );
        const data = await response.data;
        console.log(data.info);
        setCharacterList(data.results);
        const [, ...result] = Array(data.info.pages + 1).keys();
        setPages(result);
        setPageNumber(result[0]);
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
    console.log('filtered characters');
  };

  const handleClear = () => {
    fetchAllCharacters();
    setFilter(null);
    select.current.value = '';
  };

  return (
    <div className='filter'>
      <select
        ref={select}
        defaultValue=''
        onChange={filterCharacters}
        className='filter-select'>
        <option value='' className='filter-option' disabled>
          Filter
        </option>
        <option value='female' className='filter-option'>
          female
        </option>
        <option value='male' className='filter-option'>
          male
        </option>
        <option value='genderless' className='filter-option'>
          genderless
        </option>
        <option value='alive' className='filter-option'>
          alive
        </option>
        <option value='dead' className='filter-option'>
          dead
        </option>
      </select>
      {filter && (
        <button className='filter-clear-btn' onClick={handleClear}>
          clear
        </button>
      )}
    </div>
  );
}

export default CharacterFilters;
