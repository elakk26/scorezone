import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Cricket from './pages/Cricket';
import Football from './pages/Football';
import TeamStats from './pages/TeamStats';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/cricket" element={<Cricket />} />
        <Route path="/football" element={<Football />} />
        <Route path="teamstats" element={<TeamStats />} />
      </Routes>
    </Router>
  );
}

export default App;