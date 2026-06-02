import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="landing-header">
        <h1>ScoreZone</h1>
        <p>Your Live Sports Dashboard</p>
      </div>

      <div className="sports-cards">
        <div className="sport-card cricket-card" onClick={() => navigate('/cricket')}>
          <h2>Cricket</h2>
          <p>Live scores, upcoming matches and team stats</p>
          <button>View Cricket</button>
        </div>

        <div className="sport-card football-card" onClick={() => navigate('/football')}>
          <h2>Football</h2>
          <p>Live scores, leagues and standings</p>
          <button>View Football</button>
        </div>
      </div>
    </div>
  );
}

export default Landing;