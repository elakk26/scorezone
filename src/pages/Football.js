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
      setLiveMatches(live.data?.response?.matches || []);
      setUpcomingMatches(upcoming.data?.response?.matches || []);
      setRecentMatches(recent.data?.response?.matches || []);
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

  const renderMatch = (match, index) => {
    const isFinished = match.status?.finished;
    const isLive = match.status?.started && !match.status?.finished;

    return (
      <div key={index} className={`match-card ${isLive ? 'live-card' : ''}`}>
        {isLive && <span className="live-badge">LIVE</span>}
        <div className="match-teams">
          <span>{match.home?.name}</span>
          {isFinished || isLive ? (
            <span className="score">{match.status?.scoreStr}</span>
          ) : (
            <span className="vs">vs</span>
          )}
          <span>{match.away?.name}</span>
        </div>
        <div className="match-info">
          <span>{match.time}</span>
          <span>{match.status?.reason?.long || 'Upcoming'}</span>
        </div>
      </div>
    );
  };

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
          {liveMatches.map((match, index) => renderMatch(match, index))}
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
          {activeTab === 'upcoming' && upcomingMatches.map((match, index) => renderMatch(match, index))}
          {activeTab === 'recent' && recentMatches.map((match, index) => renderMatch(match, index))}
          {activeTab === 'upcoming' && upcomingMatches.length === 0 && (
            <div className="no-data">No matches today</div>
          )}
          {activeTab === 'recent' && recentMatches.length === 0 && (
            <div className="no-data">No recent matches</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Football;