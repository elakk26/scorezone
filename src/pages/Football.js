import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { footballAPI } from '../services/api';
import './Football.css';

function Football() {
  const navigate = useNavigate();
  const [liveMatches, setLiveMatches] = useState([]);
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [recentMatches, setRecentMatches] = useState([]);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(0);

  const fetchData = async () => {
    try {
      const [live, upcoming, recent] = await Promise.all([
        footballAPI.getLive(),
        footballAPI.getUpcoming(),
        footballAPI.getRecent(),
      ]);
      setLiveMatches(live.data?.response || []);
      setUpcomingMatches(upcoming.data?.response || []);
      setRecentMatches(recent.data?.response || []);
      setLastUpdated(0);
    } catch (error) {
      console.error('Error fetching football data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const dataInterval = setInterval(fetchData, 30000);
    const timerInterval = setInterval(() => {
      setLastUpdated(prev => prev + 1);
    }, 1000);
    return () => {
      clearInterval(dataInterval);
      clearInterval(timerInterval);
    };
  }, []);

  return (
    <div className="football-container">
      <div className="football-header">
        <button className="back-btn" onClick={() => navigate('/')}>Back</button>
        <h1>Football</h1>
        <span className="update-timer">Updated {lastUpdated}s ago</span>
      </div>

      {liveMatches.length > 0 && (
        <div className="live-section">
          <div className="section-title">
            <span className="live-badge">LIVE</span>
            <h2>Live Matches</h2>
          </div>
          {liveMatches.map((match, index) => (
            <div key={index} className="match-card live-card">
              <div className="match-teams">
                <span>{match.homeTeam?.name}</span>
                <span className="score">{match.homeScore} - {match.awayScore}</span>
                <span>{match.awayTeam?.name}</span>
              </div>
              <div className="match-info">
                <span>{match.league?.name}</span>
                <span>{match.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="tabs">
        <button className={activeTab === 'upcoming' ? 'tab active' : 'tab'} onClick={() => setActiveTab('upcoming')}>Today</button>
        <button className={activeTab === 'recent' ? 'tab active' : 'tab'} onClick={() => setActiveTab('recent')}>Yesterday</button>
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="matches-list">
          {activeTab === 'upcoming' && upcomingMatches.map((match, index) => (
            <div key={index} className="match-card">
              <div className="match-league">{match.league?.name}</div>
              <div className="match-teams">
                <span>{match.homeTeam?.name}</span>
                <span className="vs">vs</span>
                <span>{match.awayTeam?.name}</span>
              </div>
              <div className="match-info">
                <span>{match.status}</span>
                <span>{match.venue}</span>
              </div>
            </div>
          ))}

          {activeTab === 'recent' && recentMatches.map((match, index) => (
            <div key={index} className="match-card">
              <div className="match-league">{match.league?.name}</div>
              <div className="match-teams">
                <span>{match.homeTeam?.name}</span>
                <span className="score">{match.homeScore} - {match.awayScore}</span>
                <span>{match.awayTeam?.name}</span>
              </div>
              <div className="match-info">
                <span>{match.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Football;