import { useContext, useEffect, useState } from "react";
import axios from "axios";
import APIContext from "../Context/APIContext";
import rightArrowIcon from "../assets/right-arrow.png";
import leftArrowIcon from "../assets/left-arrow.png";

function Pagination() {
  const [prevButtonDisabled, setPrevButtonDisabled] = useState(false);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(false);

  const {
    pageNumber,
    setPageNumber,
    pages,
    setCharacterList,
    baseURL,
    filter
  } = useContext(APIContext);

  const fetchPage = async (buttonValue) => {
    if (filter === "male") {
      const response = await axios.get(
        baseURL + `character?page=${buttonValue}&gender=male`
      );
      const data = await response.data;
      setPageNumber(buttonValue);
      setCharacterList(data.results);
      console.log(data);
    } else if (filter === "female") {
      const response = await axios.get(
        baseURL + `character?page=${buttonValue}&gender=female`
      );
      const data = await response.data;
      setPageNumber(buttonValue);
      setCharacterList(data.results);
      console.log(data);
    } else if (filter === "genderless") {
      const response = await axios.get(
        baseURL + `character?page=${buttonValue}&gender=genderless`
      );
      const data = await response.data;
      setPageNumber(buttonValue);
      setCharacterList(data.results);
      console.log(data);
    } else if (filter === "alive") {
      const response = await axios.get(
        baseURL + `character?page=${buttonValue}&status=alive`
      );
      const data = await response.data;
      setPageNumber(buttonValue);
      setCharacterList(data.results);
      console.log(data);
    } else if (filter === "dead") {
      const response = await axios.get(
        baseURL + `character?page=${buttonValue}&status=dead`
      );
      const data = await response.data;
      setPageNumber(buttonValue);
      setCharacterList(data.results);
      console.log(data);
    } else {
      const response = await axios.get(
        baseURL + `character?page=${buttonValue}`
      );
      const data = await response.data;
      setPageNumber(buttonValue);
      setCharacterList(data.results);
      console.log(data);
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
    <div className="pagination">
      <div className="page-btn-ctr">
        {pages &&
          pages.map((page, index) => (
            <button
              className={page === pageNumber ? "page-btn-active" : "page-btn"}
              page={page}
              key={index}
              onClick={() => fetchPage(page)}
            >
              {page}
            </button>
          ))}
      </div>
      <div className="prev-next-btn-ctr">
        <button
          className="arrow-btn"
          onClick={handlePrevClick}
          disabled={prevButtonDisabled}
        >
          <img
            className="arrow-btn-img"
            src={leftArrowIcon}
            alt="left arrow icon"
          />
        </button>
        <button
          className="arrow-btn"
          onClick={handleNextClick}
          disabled={nextButtonDisabled}
        >
          <img
            className="arrow-btn-img"
            src={rightArrowIcon}
            alt="right arrow icon"
          />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
