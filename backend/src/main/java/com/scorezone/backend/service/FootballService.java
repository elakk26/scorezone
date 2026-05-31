package com.scorezone.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
public class FootballService {

    @Value("${football.api.key}")
    private String apiKey;

    @Value("${football.api.host}")
    private String apiHost;

    private final RestTemplate restTemplate = new RestTemplate();
    private final String BASE_URL = "https://free-api-live-football-data.p.rapidapi.com";

    private HttpHeaders getHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("x-rapidapi-key", apiKey);
        headers.set("x-rapidapi-host", apiHost);
        return headers;
    }

    @Cacheable("footballLive")
    public Object getLiveMatches() {
        String url = BASE_URL + "/football-current-live";
        HttpEntity<String> entity = new HttpEntity<>(getHeaders());
        ResponseEntity<Object> response = restTemplate.exchange(url, HttpMethod.GET, entity, Object.class);
        return response.getBody();
    }

    @Cacheable("footballToday")
    public Object getUpcomingMatches() {
        String today = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String url = BASE_URL + "/football-get-matches-by-date?date=" + today;
        HttpEntity<String> entity = new HttpEntity<>(getHeaders());
        ResponseEntity<Object> response = restTemplate.exchange(url, HttpMethod.GET, entity, Object.class);
        return response.getBody();
    }

    @Cacheable("footballRecent")
    public Object getRecentMatches() {
        String yesterday = LocalDate.now().minusDays(1).format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String url = BASE_URL + "/football-get-matches-by-date?date=" + yesterday;
        HttpEntity<String> entity = new HttpEntity<>(getHeaders());
        ResponseEntity<Object> response = restTemplate.exchange(url, HttpMethod.GET, entity, Object.class);
        return response.getBody();
    }

    @Cacheable("footballLeagues")
    public Object getAllLeagues() {
        String url = BASE_URL + "/football-get-all-leagues";
        HttpEntity<String> entity = new HttpEntity<>(getHeaders());
        ResponseEntity<Object> response = restTemplate.exchange(url, HttpMethod.GET, entity, Object.class);
        return response.getBody();
    }

    @Cacheable("footballTeams")
    public Object getTeamsByLeague(String leagueId) {
        String url = BASE_URL + "/football-get-list-all-team?leagueid=" + leagueId;
        HttpEntity<String> entity = new HttpEntity<>(getHeaders());
        ResponseEntity<Object> response = restTemplate.exchange(url, HttpMethod.GET, entity, Object.class);
        return response.getBody();
    }

    public Object getMatchesByLeague(String leagueId) {
        String url = BASE_URL + "/football-get-all-matches-by-league?leagueid=" + leagueId;
        HttpEntity<String> entity = new HttpEntity<>(getHeaders());
        ResponseEntity<Object> response = restTemplate.exchange(url, HttpMethod.GET, entity, Object.class);
        return response.getBody();
    }

    public Object getMatchScore(String eventId) {
        String url = BASE_URL + "/football-get-match-score?eventid=" + eventId;
        HttpEntity<String> entity = new HttpEntity<>(getHeaders());
        ResponseEntity<Object> response = restTemplate.exchange(url, HttpMethod.GET, entity, Object.class);
        return response.getBody();
    }

    public Object getLeagueStandings(String leagueId) {
        String url = BASE_URL + "/football-get-league-detail?leagueid=" + leagueId;
        HttpEntity<String> entity = new HttpEntity<>(getHeaders());
        ResponseEntity<Object> response = restTemplate.exchange(url, HttpMethod.GET, entity, Object.class);
        return response.getBody();
    }
}