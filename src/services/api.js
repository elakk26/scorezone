import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export const cricketAPI = {
  getLive: () => axios.get(`${BASE_URL}/cricket/live`),
  getUpcoming: () => axios.get(`${BASE_URL}/cricket/upcoming`),
  getRecent: () => axios.get(`${BASE_URL}/cricket/recent`),
  getSchedule: () => axios.get(`${BASE_URL}/cricket/schedule`),
  getTeams: () => axios.get(`${BASE_URL}/cricket/teams`),
  getScoreboard: (matchId) => axios.get(`${BASE_URL}/cricket/scoreboard/${matchId}`),
  getPlayers: (teamId) => axios.get(`${BASE_URL}/cricket/players/${teamId}`),
};

export const footballAPI = {
  getLive: () => axios.get(`${BASE_URL}/football/live`),
  getUpcoming: () => axios.get(`${BASE_URL}/football/upcoming`),
  getRecent: () => axios.get(`${BASE_URL}/football/recent`),
  getLeagues: () => axios.get(`${BASE_URL}/football/leagues`),
  getTeams: (leagueId) => axios.get(`${BASE_URL}/football/teams/${leagueId}`),
  getStandings: (leagueId) => axios.get(`${BASE_URL}/football/standings/${leagueId}`),
  getMatchScore: (eventId) => axios.get(`${BASE_URL}/football/score/${eventId}`),
};