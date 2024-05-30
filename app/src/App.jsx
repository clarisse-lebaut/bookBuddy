import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Collections from './pages/Collections';
import Favorites from './pages/Favorites';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

export default function App() {
  // Puts user's id here
  const [user, setUser] = useState({});

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/gallery' element={<Gallery user={user} />} />
        <Route path='/collections' element={<Collections user={user} />} />
        <Route path='/favorites' element={<Favorites user={user} setUser={setUser} />} />
      </Routes>
    </>
  );
}
