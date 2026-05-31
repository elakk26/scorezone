package com.scorezone.backend.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

@Service
@Slf4j
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
        String url = BASE_URL + "/football-get-all-live-matches";
        HttpEntity<String> entity = new HttpEntity<>(getHeaders());
        ResponseEntity<Object> response = restTemplate.exchange(url, HttpMethod.GET, entity, Object.class);
        return response.getBody();
    }

    @Cacheable("footballUpcoming")
    public Object getUpcomingMatches() {
        String url = BASE_URL + "/football-get-matches-by-date?date=today";
        HttpEntity<String> entity = new HttpEntity<>(getHeaders());
        ResponseEntity<Object> response = restTemplate.exchange(url, HttpMethod.GET, entity, Object.class);
        return response.getBody();
    }

    @Cacheable("footballRecent")
    public Object getRecentMatches() {
        String url = BASE_URL + "/football-get-matches-by-date?date=yesterday";
        HttpEntity<String> entity = new HttpEntity<>(getHeaders());
        ResponseEntity<Object> response = restTemplate.exchange(url, HttpMethod.GET, entity, Object.class);
        return response.getBody();
    }

    @Cacheable("footballStandings")
    public Object getStandings(String leagueId) {
        String url = BASE_URL + "/football-get-standing-all?leagueid=" + leagueId;
        HttpEntity<String> entity = new HttpEntity<>(getHeaders());
        ResponseEntity<Object> response = restTemplate.exchange(url, HttpMethod.GET, entity, Object.class);
        return response.getBody();
    }

    @Cacheable("footballTeams")
    public Object getAllTeams(String leagueId) {
        String url = BASE_URL + "/football-get-all-teams-by-leagueid?leagueid=" + leagueId;
        HttpEntity<String> entity = new HttpEntity<>(getHeaders());
        ResponseEntity<Object> response = restTemplate.exchange(url, HttpMethod.GET, entity, Object.class);
        return response.getBody();
    }

    public Object getTeamMatches(String teamId) {
        String url = BASE_URL + "/football-get-all-matches-by-team?teamid=" + teamId;
        HttpEntity<String> entity = new HttpEntity<>(getHeaders());
        ResponseEntity<Object> response = restTemplate.exchange(url, HttpMethod.GET, entity, Object.class);
        return response.getBody();
    }
}