import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cricketAPI } from '../services/api';
import toast from 'react-hot-toast';
import './Cricket.css';

function Cricket() {
  const navigate = useNavigate();
  const [liveMatches, setLiveMatches] = useState([]);
  const [recentMatches, setRecentMatches] = useState([]);
  const [scheduleData, setScheduleData] = useState([]);
  const [activeTab, setActiveTab] = useState('recent');
  const [filter, setFilter] = useState('India');
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(0);

  const extractMatches = (data) => {
    const matches = [];
    if (!data?.typeMatches) return matches;
    data.typeMatches.forEach(type => {
      type.seriesAdWrapper?.forEach(wrapper => {
        const seriesName = wrapper.seriesMatches?.seriesName || '';
        wrapper.seriesMatches?.matches?.forEach(match => {
          matches.push({
            ...match,
            matchType: type.matchType,
            seriesNameForFilter: seriesName
          });
        });
      });
    });
    return matches;
  };

  const applyFilter = (matches) => {
    switch(filter) {
      case 'India':
        return matches.filter(m => {
          const t1 = m.matchInfo?.team1?.teamName || '';
          const t2 = m.matchInfo?.team2?.teamName || '';
          return t1.includes('India') || t2.includes('India');
        });
      case 'Men':
        return matches.filter(m => {
          const t1 = m.matchInfo?.team1?.teamName || '';
          const t2 = m.matchInfo?.team2?.teamName || '';
          const series = m.seriesNameForFilter || '';
          const indiaPlaying = t1.includes('India') || t2.includes('India');
          const notWomen = !t1.includes('Women') && !t2.includes('Women') && !series.includes('Women');
          return indiaPlaying && notWomen;
        });
      case 'Women':
        return matches.filter(m => {
          const t1 = m.matchInfo?.team1?.teamName || '';
          const t2 = m.matchInfo?.team2?.teamName || '';
          return t1.includes('India Women') || t2.includes('India Women');
        });
      case 'IPL':
        return matches.filter(m =>
          m.seriesNameForFilter?.includes('IPL') ||
          m.seriesNameForFilter?.includes('Indian Premier League')
        );
      case 'ICC':
        return matches.filter(m =>
          m.seriesNameForFilter?.includes('ICC') ||
          m.seriesNameForFilter?.includes('World Cup') ||
          m.seriesNameForFilter?.includes('Champions Trophy') ||
          m.seriesNameForFilter?.includes('Asia Cup')
        );
      case 'International':
        return matches.filter(m => m.matchType === 'International');
      case 'All':
        return matches;
      default:
        return matches;
    }
  };

  const fetchData = async () => {
    try {
      const [live, recent, schedule] = await Promise.all([
        cricketAPI.getLive(),
        cricketAPI.getRecent(),
        cricketAPI.getSchedule(),
      ]);
      setLiveMatches(extractMatches(live.data));
      setRecentMatches(extractMatches(recent.data));
      setScheduleData(schedule.data?.response?.schedules || []);
      if (lastUpdated > 0) toast.success('Scores updated!');
      setLastUpdated(0);
    } catch (error) {
      toast.error('Failed to fetch data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const dataInterval = setInterval(fetchData, 30000);
    const timerInterval = setInterval(() => setLastUpdated(prev => prev + 1), 1000);
    return () => { clearInterval(dataInterval); clearInterval(timerInterval); };
  }, []);

  const renderScore = (match) => {
    const t1 = match.matchScore?.team1Score?.inngs1;
    const t2 = match.matchScore?.team2Score?.inngs1;
    if (!t1) return null;
    return (
      <div className="score-box">
        <span>{match.matchInfo?.team1?.teamSName}: {t1.runs}/{t1.wickets} ({t1.overs})</span>
        {t2 && <span>{match.matchInfo?.team2?.teamSName}: {t2.runs}/{t2.wickets} ({t2.overs})</span>}
      </div>
    );
  };

  const renderMatch = (match, index) => {
    const info = match.matchInfo;
    const isLive = info?.state === 'In Progress';
    return (
      <div key={index} className={`match-card ${isLive ? 'live-card' : ''}`}>
        {isLive && <span className="live-badge">LIVE</span>}
        <div className="match-series">{info?.seriesName}</div>
        <div className="match-teams">
          <span>{info?.team1?.teamName}</span>
          <span className="vs">vs</span>
          <span>{info?.team2?.teamName}</span>
        </div>
        {renderScore(match)}
        <div className="match-status">{info?.status}</div>
        <div className="match-info">
          <span>{info?.matchDesc}</span>
          <span>{info?.venueInfo?.city}</span>
          <span className="match-format">{info?.matchFormat}</span>
        </div>
      </div>
    );
  };

  const filteredLive = applyFilter(liveMatches);
  const filteredRecent = applyFilter(recentMatches);

  const navItems = [
    { key: 'India', label: 'India' },
    { key: 'Men', label: 'Men' },
    { key: 'Women', label: 'Women' },
    { key: 'IPL', label: 'IPL' },
    { key: 'ICC', label: 'ICC' },
    { key: 'International', label: 'International' },
    { key: 'All', label: 'All' },
  ];

  return (
    <div className="cricket-container">
      <div className="cricket-header">
        <button className="back-btn" onClick={() => navigate('/')}>Back</button>
        <h1>Cricket</h1>
        <span className="update-timer">Updated {lastUpdated}s ago</span>
      </div>

      <div className="cricket-subnav">
        {navItems.map(item => (
          <button
            key={item.key}
            className={filter === item.key ? 'subnav-btn active' : 'subnav-btn'}
            onClick={() => setFilter(item.key)}>
            {item.label}
          </button>
        ))}
      </div>

      {filteredLive.length > 0 && (
        <div className="live-section">
          <div className="section-title">
            <span className="live-badge">LIVE</span>
            <h2>Live Matches</h2>
          </div>
          {filteredLive.map((match, i) => renderMatch(match, i))}
        </div>
      )}

      <div className="tabs">
        <button
          className={activeTab === 'recent' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('recent')}>
          Recent
        </button>
        <button
          className={activeTab === 'upcoming' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('upcoming')}>
          Upcoming
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="matches-list">
          {activeTab === 'recent' && filteredRecent.map((match, i) => renderMatch(match, i))}
          {activeTab === 'recent' && filteredRecent.length === 0 && (
            <div className="no-data">No matches found</div>
          )}

          {activeTab === 'upcoming' && scheduleData.map((daySchedule, i) => (
            <div key={i}>
              <div className="date-header">{daySchedule.scheduleAdWrapper?.date}</div>
              {daySchedule.scheduleAdWrapper?.matchScheduleList?.map((series, j) =>
                series.matchInfo?.map((match, k) => {
                  const t1 = match.team1?.teamName || '';
                  const t2 = match.team2?.teamName || '';
                  const sName = series.seriesName || '';
                  const show = filter === 'All' ||
                    (filter === 'India' && (t1.includes('India') || t2.includes('India'))) ||
                    (filter === 'Men' && (t1.includes('India') || t2.includes('India')) && !t1.includes('Women') && !t2.includes('Women')) ||
                    (filter === 'Women' && (t1.includes('India Women') || t2.includes('India Women'))) ||
                    (filter === 'IPL' && sName.includes('IPL')) ||
                    (filter === 'ICC' && (sName.includes('ICC') || sName.includes('World Cup'))) ||
                    (filter === 'International');
                  if (!show) return null;
                  return (
                    <div key={`${i}-${j}-${k}`} className="match-card">
                      <div className="match-series">{series.seriesName}</div>
                      <div className="match-teams">
                        <span>{match.team1?.teamName}</span>
                        <span className="vs">vs</span>
                        <span>{match.team2?.teamName}</span>
                      </div>
                      <div className="match-info">
                        <span>{match.matchDesc}</span>
                        <span>{match.venueInfo?.city}</span>
                        <span className="match-format">{match.matchFormat}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cricket;