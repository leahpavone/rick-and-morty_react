import { useContext, useEffect, useState } from "react";
import axios from "axios";
import APIContext from "../Context/APIContext";

function CharacterFilters() {
  const [filteredCharacters, setFilteredCharacters] = useState([]);

  const filterCharacters = async () => {};

  return <div>CharacterFilters</div>;
}

export default CharacterFilters;
