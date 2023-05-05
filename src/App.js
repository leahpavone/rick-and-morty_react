import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { APIProvider } from './Context/APIContext';
import Home from './Pages/Home';
import CharacterPage from './Pages/CharacterPage';
import EpisodePage from './Pages/EpisodePage';
import LocationPage from './Pages/LocationPage';

function App() {
  return (
    <>
      <APIProvider>
        <Router basename={process.env.PUBLIC_URL}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/character/:id' element={<CharacterPage />} />
            <Route path='/episode/:id' element={<EpisodePage />} />
            <Route path='/location/:id' element={<LocationPage />} />
          </Routes>
        </Router>
      </APIProvider>
    </>
  );
}

export default App;

// search bar - search by name
//      have link to page with all characters
//      main character img and name
// click on character img and name character page with all info and the alternate identities
// have episodes and location and origin to click on and go to page with all info of the episodes / location / origin
// click on alternate identity to get the specific info about each identity
