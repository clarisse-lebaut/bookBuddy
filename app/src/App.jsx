import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import LogUp from './pages/LogUp';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* route pour se connecter */}
        <Route path="/signIn" element={<LogIn />} />
        {/* route pour se crée un compte */}
        <Route path="/signUp" element={<LogUp />} />
      </Routes>
    </>
  );
}
