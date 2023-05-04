import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import APIContext from '../Context/APIContext';
import { FaArrowRight } from 'react-icons/fa';
import { FaArrowLeft } from 'react-icons/fa';

function Pagination() {
  const [prevButtonDisabled, setPrevButtonDisabled] = useState(false);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(false);

  const {
    pageNumber,
    setPageNumber,
    pages,
    setPages,
    setCharacterList,
    baseURL,
    filter
  } = useContext(APIContext);

  const fetchPage = async (buttonValue) => {
    if (filter === 'male') {
      const response = await axios.get(
        baseURL + `character?page=${buttonValue}&gender=male`
      );
      const data = await response.data;
      setPageNumber(buttonValue);
      setCharacterList(data.results);
    } else if (filter === 'female') {
      const response = await axios.get(
        baseURL + `character?page=${buttonValue}&gender=female`
      );
      const data = await response.data;
      setPageNumber(buttonValue);
      setCharacterList(data.results);
    } else if (filter === 'genderless') {
      const response = await axios.get(
        baseURL + `character?page=${buttonValue}&gender=genderless`
      );
      const data = await response.data;
      setPageNumber(buttonValue);
      setCharacterList(data.results);
    } else if (filter === 'alive') {
      const response = await axios.get(
        baseURL + `character?page=${buttonValue}&status=alive`
      );
      const data = await response.data;
      setPageNumber(buttonValue);
      setCharacterList(data.results);
    } else if (filter === 'dead') {
      const response = await axios.get(
        baseURL + `character?page=${buttonValue}&status=dead`
      );
      const data = await response.data;
      setPageNumber(buttonValue);
      setCharacterList(data.results);
    } else {
      const response = await axios.get(
        baseURL + `character?page=${buttonValue}`
      );
      const data = await response.data;
      setPageNumber(buttonValue);
      setCharacterList(data.results);
    }
  };

  const handleNextClick = async () => {
    setNextButtonDisabled(false);
    const newPage = pageNumber + 1;
    const response = await axios.get(baseURL + `character?page=${newPage}`);
    const data = await response.data;
    setPageNumber((prevState) => prevState + 1);
    setCharacterList(data.results);
    console.log(data.results[data.results.length - 1]);
    if (newPage === data.results[data.results.length - 1]) {
      setNextButtonDisabled(true);
    }
  };

  const handlePrevClick = async () => {
    const newPage = pageNumber - 1;
    const response = await axios.get(baseURL + `character?page=${newPage}`);
    const data = await response.data;
    setPageNumber((prevState) => prevState - 1);
    setCharacterList(data.results);
  };

  useEffect(() => {
    if (pageNumber === 1) {
      setPrevButtonDisabled(true);
      console.log(pages);
    } else {
      setPrevButtonDisabled(false);
    }
    if (pageNumber > pages.length - 1) {
      setNextButtonDisabled(true);
    } else {
      setNextButtonDisabled(false);
    }
  }, [pageNumber, pages.length]);

  return (
    <div className='pagination'>
      <div className='page-btn-ctr'>
        {pages &&
          pages.map((page, index) => (
            <button
              className={page === pageNumber ? 'page-btn-active' : 'page-btn'}
              page={page}
              key={index}
              onClick={() => fetchPage(page)}>
              {page}
            </button>
          ))}
      </div>

      <div className='prev-next-btn-ctr'>
        <button
          className='arrow-btn'
          onClick={handlePrevClick}
          disabled={prevButtonDisabled}>
          <FaArrowLeft className='arrow-btn-img' />
        </button>

        <button
          className='arrow-btn'
          onClick={handleNextClick}
          disabled={nextButtonDisabled}>
          <FaArrowRight className='arrow-btn-img' />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
