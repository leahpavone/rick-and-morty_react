// import { useState, useContext, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// function EpisodeCharacters({ character }) {
//   const [episodeCharacterData, setEpisodeCharacterData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const fetchEpisodeCharcterData = async () => {
//     setIsLoading(true);
//     try {
//       const response = await axios.get(character);
//       const data = await response.data;
//       // console.log(data);
//       setEpisodeCharacterData(data);
//       setIsLoading(false);
//     } catch (error) {
//       console.log(error.message);
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEpisodeCharcterData();
//   }, []);
//   return (
//     <Link
//       to={`/character/${episodeCharacterData.id}`}
//       className="episode-character-card-container"
//     >
//       <img
//         src={episodeCharacterData.image}
//         alt={episodeCharacterData.name}
//         className="episode-character-card-img"
//       />
//       <p className="episode-character-card-name">{episodeCharacterData.name}</p>
//     </Link>

//   );
// }

// export default EpisodeCharacters;

// import { useState, useContext, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// function EpisodeCharacters({ character }) {
//   const [episodeCharacterData, setEpisodeCharacterData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const fetchEpisodeCharcterData = async () => {
//     setIsLoading(true);
//     try {
//       const response = await axios.get(character);
//       const data = await response.data;
//       // console.log(data);
//       setEpisodeCharacterData(data);
//       setIsLoading(false);
//     } catch (error) {
//       console.log(error.message);
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEpisodeCharcterData();
//   }, []);
//   return (
//     // <>
//     // <div>
//     <Link
//       to={`/character/${episodeCharacterData.id}`}
//       className="episode-character-card-container"
//     >
//       <img
//         src={episodeCharacterData.image}
//         alt={episodeCharacterData.name}
//         className="episode-character-card-img"
//       />
//       <p className="episode-character-card-name">{episodeCharacterData.name}</p>
//     </Link>
//     // </div>
//     // </>
//   );
// }

// export default EpisodeCharacters;
