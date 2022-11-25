import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { Loader } from "../Components/Loader";

const APIContext = createContext();

export const APIProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [characterList, setCharacterList] = useState([]);
  const [characterListInfo, setCharacterListInfo] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pages, setPages] = useState([]);
  const [filter, setFilter] = useState(null);

  const baseURL = "https://rickandmortyapi.com/api/";

  const fetchAllCharacters = async () => {
    try {
      const response = await axios.get(
        baseURL + `character?page=${pageNumber}`
      );
      const data = await response.data;
      setCharacterList(data.results);
      setCharacterListInfo(data.info);
      // console.log(data.info);
      const [, ...result] = Array(data.info.pages + 1).keys();
      setPages(result);
      setPageNumber(result[0]);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchAllCharacters();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <APIContext.Provider
      value={{
        characterList,
        setCharacterList,
        characterListInfo,
        setCharacterListInfo,
        pages,
        setPages,
        pageNumber,
        setPageNumber,
        baseURL,
        filter,
        setFilter,
        fetchAllCharacters
      }}
    >
      {children}
    </APIContext.Provider>
  );
};

export default APIContext;
