import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { cricketAPI } from '../services/api';
import './TeamStats.css';

function TeamStats() {
  const navigate = useNavigate();
  const { teamId, teamName } = useParams();
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await cricketAPI.getPlayers(teamId);
        setPlayers(response.data?.response || []);
      } catch (error) {
        console.error('Error fetching players:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlayers();
  }, [teamId]);

  return (
    <div className="teamstats-container">
      <div className="teamstats-header">
        <button className="back-btn" onClick={() => navigate('/cricket')}>Back</button>
        <h1>{decodeURIComponent(teamName)}</h1>
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="players-table">
          <table>
            <thead>
              <tr>
                <th>Player</th>
                <th>Role</th>
                <th>Batting</th>
                <th>Bowling</th>
              </tr>
            </thead>
            <tbody>
              {players.length > 0 ? players.map((player, index) => (
                <tr key={index}>
                  <td>{player.name}</td>
                  <td>{player.role || 'N/A'}</td>
                  <td>{player.bat || 'N/A'}</td>
                  <td>{player.bowl || 'N/A'}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" style={{textAlign: 'center', color: '#555'}}>No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TeamStats;