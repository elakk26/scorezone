import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cricketAPI } from '../services/api';
import './Cricket.css';

function Cricket() {
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
        cricketAPI.getLive(),
        cricketAPI.getUpcoming(),
        cricketAPI.getRecent(),
      ]);
      setLiveMatches(live.data?.response || []);
      setUpcomingMatches(upcoming.data?.response?.typeMatches || []);
      setRecentMatches(recent.data?.response?.typeMatches || []);
      setLastUpdated(0);
    } catch (error) {
      console.error('Error fetching cricket data:', error);
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
    <div className="cricket-container">
      <div className="cricket-header">
        <button className="back-btn" onClick={() => navigate('/')}>Back</button>
        <h1>Cricket</h1>
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
              <p>{match.matchDesc}</p>
              <p>{match.team1?.teamName} vs {match.team2?.teamName}</p>
            </div>
          ))}
        </div>
      )}

      <div className="tabs">
        <button className={activeTab === 'upcoming' ? 'tab active' : 'tab'} onClick={() => setActiveTab('upcoming')}>Upcoming</button>
        <button className={activeTab === 'recent' ? 'tab active' : 'tab'} onClick={() => setActiveTab('recent')}>Recent</button>
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="matches-list">
          {activeTab === 'upcoming' && upcomingMatches.map((type, i) =>
            type.seriesAdWrapper?.map((series, j) =>
              series.seriesMatches?.matchseries?.matches?.map((match, k) => (
                <div key={`${i}-${j}-${k}`} className="match-card">
                  <div className="match-series">{series.seriesMatches?.seriesName}</div>
                  <div className="match-teams">
                    <span>{match.matchInfo?.team1?.teamName}</span>
                    <span className="vs">vs</span>
                    <span>{match.matchInfo?.team2?.teamName}</span>
                  </div>
                  <div className="match-info">
                    <span>{match.matchInfo?.matchDesc}</span>
                    <span>{match.matchInfo?.venueInfo?.city}</span>
                  </div>
                </div>
              ))
            )
          )}

          {activeTab === 'recent' && recentMatches.length === 0 && (
            <div className="no-data">No recent matches available</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Cricket;