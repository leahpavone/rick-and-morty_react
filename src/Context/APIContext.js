import { createContext, useEffect, useState } from "react";
import axios from "axios";

const APIContext = createContext();

export const APIProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [characterList, setCharacterList] = useState([]);
  const [characterListInfo, setCharacterListInfo] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pages, setPages] = useState([]);
  const [filter, setFilter] = useState("");

  const baseURL = "https://rickandmortyapi.com/api/";

  const fetchAllCharacters = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        baseURL + `character?page=${pageNumber}`
      );
      const data = await response.data;
      setCharacterList(data.results);
      setCharacterListInfo(data.info);
      const [, ...result] = Array(data.info.pages + 1).keys();
      setPages(result);
      setPageNumber(result[0]);
      // setIsFiltered(false);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      // setIsFiltered(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCharacters();
  }, []);

  if (isLoading) {
    return <div>loading...</div>;
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
        setFilter
      }}
    >
      {children}
    </APIContext.Provider>
  );
};

export default APIContext;
