import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar.jsx';
import LandingPage from './pages/LandingPage/LandingPage.jsx';
import Artikel from './pages/Artikel/Artikel.jsx';
import Veranstaltungen from './pages/Veranstaltungen/Veranstaltungen.jsx';
import Vereine from './pages/Vereine/Vereine.jsx';
import Notdienst from './pages/Notdienst/Notdienst.jsx';
import Politik from './pages/Politik/Politik.jsx';
import Magazine from './pages/Magazine/Magazine.jsx';
import Kontakt from './pages/Kontakt/Kontakt.jsx';
import Impressum from './pages/Impressum/Impressum.jsx';
import Datenschutzerklärung from './pages/Datenschutzerklärung/Datenschutzerklärung.jsx';
import Upload from './pages/Upload/Upload.jsx';
import useFaviconChanger from './hooks/useFaviconChanger';

function App() {
  /* useStates to handle if the menu is swiped open & close */
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const [active, setActive] = useState(false);

  /* favicon changer hook */
  useFaviconChanger();

  /* function to handle burger menu toggle */
  const handleMenuToggle = () => {
    setActive(!active);
  };

  /* function to close burger menu */
  const handleMenuClose = () => {
    setActive(false);
  }

  /* function to capture start touch position on x-axis */
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  /* function to update touch position on x-axis */
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  /* function to determine direction & distance of swipe - then decides whether to open or close burger menu */
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) {
      /* swiped left */
      handleMenuClose();
    } else if (distance < -50) {
      /* swiped right */
      setActive(true);
    }
    /* reset */
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <BrowserRouter>
        {/* navbar */}
        <NavBar
          active={active}
          handleMenuToggle={handleMenuToggle}
        />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/artikel/:id' element={<Artikel />} />
          <Route path='/veranstaltungen' element={<Veranstaltungen />} />
          <Route path='/vereine' element={<Vereine />} />
          <Route path='/notdienste' element={<Notdienst />} />
          <Route path='/politik' element={<Politik />} />
          <Route path='/magazine' element={<Magazine />} />
          <Route path='/kontakt' element={<Kontakt />} />
          <Route path='/impressum' element={<Impressum />} />
          <Route path='/datenschutzerklärung' element={<Datenschutzerklärung />} />
          <Route path='/upload' element={<Upload />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
