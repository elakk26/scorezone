import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cricketAPI } from '../services/api';
import './Cricket.css';

function Cricket() {
  const navigate = useNavigate();
  const [liveMatches, setLiveMatches] = useState([]);
  const [scheduleData, setScheduleData] = useState([]);
  const [activeTab, setActiveTab] = useState('schedule');
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(0);

  const fetchData = async () => {
    try {
      const [live, schedule] = await Promise.all([
        cricketAPI.getLive(),
        cricketAPI.getSchedule(),
      ]);
      setLiveMatches(live.data?.response || []);
      setScheduleData(schedule.data?.response?.schedules || []);
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
              <div className="match-teams">
                <span>{match.team1?.teamName}</span>
                <span className="vs">vs</span>
                <span>{match.team2?.teamName}</span>
              </div>
              <div className="match-info">
                <span>{match.matchDesc}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="tabs">
        <button
          className={activeTab === 'schedule' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('schedule')}>
          Upcoming
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="matches-list">
          {scheduleData.map((daySchedule, i) => (
            <div key={i}>
              <div className="date-header">
                {daySchedule.scheduleAdWrapper?.date}
              </div>
              {daySchedule.scheduleAdWrapper?.matchScheduleList?.map((series, j) => (
                series.matchInfo?.map((match, k) => (
                  <div key={`${i}-${j}-${k}`} className="match-card">
                    <div className="match-series">{series.seriesName}</div>
                    <div className="match-teams">
                      <span>{match.team1?.teamName}</span>
                      <span className="vs">vs</span>
                      <span>{match.team2?.teamName}</span>
                    </div>
                    <div className="match-info">
                      <span>{match.matchDesc}</span>
                      <span>{match.venueInfo?.city}, {match.venueInfo?.country}</span>
                    </div>
                    <div className="match-format">{match.matchFormat}</div>
                  </div>
                ))
              ))}
            </div>
          ))}
          {scheduleData.length === 0 && (
            <div className="no-data">No upcoming matches</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Cricket;