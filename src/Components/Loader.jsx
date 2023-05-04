import { useState } from 'react';
import LetterLogo from '../assets/LetterLogo';
import SkaterRickGif from '../assets/gifs/rick-1.gif';
import PortalGif from '../assets/gifs/portal-2.gif';
import Gif2 from '../assets/gifs/rick-2.gif';
import Gif3 from '../assets/gifs/rick-3.gif';
import Gif4 from '../assets/gifs/rick-4.gif';
import Gif5 from '../assets/gifs/rick-5.gif';
import Gif6 from '../assets/gifs/rick-6.gif';
import Gif7 from '../assets/gifs/rick-7.gif';
import Gif8 from '../assets/gifs/rick-8.gif';
import Gif9 from '../assets/gifs/rick-9.gif';
import Gif10 from '../assets/gifs/beth-1.gif';
import Gif11 from '../assets/gifs/beth-2.gif';
import Gif12 from '../assets/gifs/jerry-1.gif';
import Gif13 from '../assets/gifs/jerry-2.gif';
import Gif14 from '../assets/gifs/jerry-3.gif';
import Gif15 from '../assets/gifs/morty-1.gif';
import Gif16 from '../assets/gifs/morty-2.gif';
import Gif17 from '../assets/gifs/pain.gif';
import Gif18 from '../assets/gifs/pickle-rick-1.gif';
import Gif19 from '../assets/gifs/smoke.gif';
import Gif20 from '../assets/gifs/summer-1.gif';
import Gif21 from '../assets/gifs/summer-2.gif';
import Gif22 from '../assets/gifs/rick-morty-color-flip.gif';

export function Loader() {
  const gifs = [
    SkaterRickGif,
    Gif2,
    Gif3,
    Gif4,
    Gif5,
    Gif6,
    Gif7,
    Gif8,
    Gif9,
    Gif10,
    Gif11,
    Gif12,
    Gif13,
    Gif14,
    Gif15,
    Gif16,
    Gif17,
    Gif18,
    Gif19,
    Gif20,
    Gif21,
    Gif22
  ];
  const [num, setNum] = useState(0);
  const [currentGif, setCurrentGif] = useState(gifs[num]);

  const handleCharacterClick = () => {
    if (num === 0 || num < gifs.length - 1) {
      setNum(num + 1);
      setCurrentGif(gifs[num + 1]);
    }
    if (num === gifs.length - 1) {
      setNum(0);

      setCurrentGif(gifs[0]);
    }
  };

  return (
    <>
      <button className='change-character-btn' onClick={handleCharacterClick}>
        Change character
      </button>
      <div className='loader-ctr'>
        <div className='loader-inner-ctr'>
          <LetterLogo style={{ width: '600px', height: '200px' }} />
          <div className='gif-img-ctr'>
            <img src={currentGif} alt='rick gif' className='gif-img' />
          </div>
        </div>
      </div>
    </>
  );
}

export function LoaderPortal() {
  return (
    <div className='loader-portal-ctr'>
      <img src={PortalGif} alt='rick gif' className='portal-gif-img' />
    </div>
  );
}
