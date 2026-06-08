import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Landing from './pages/Landing';
import Cricket from './pages/Cricket';
import Football from './pages/Football';
import TeamStats from './pages/TeamStats';
import './App.css';

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="nav-logo" onClick={() => navigate('/')}>ScoreZone</div>
      <div className="nav-links">
        <button
          className={location.pathname === '/' ? 'nav-btn active' : 'nav-btn'}
          onClick={() => navigate('/')}>
          Home
        </button>
        <button
          className={location.pathname === '/cricket' ? 'nav-btn active' : 'nav-btn'}
          onClick={() => navigate('/cricket')}>
          Cricket
        </button>
        <button
          className={location.pathname === '/football' ? 'nav-btn active' : 'nav-btn'}
          onClick={() => navigate('/football')}>
          Football
        </button>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/cricket" element={<Cricket />} />
        <Route path="/football" element={<Football />} />
        <Route path="/team/:teamId/:teamName" element={<TeamStats />} />
      </Routes>
    </Router>
  );
}

export default App;