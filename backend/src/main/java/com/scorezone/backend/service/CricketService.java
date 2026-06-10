package com.scorezone.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

@Service
public class CricketService {

    @Value("${cricbuzz.unofficial.key}")
    private String apiKey;

    @Value("${cricbuzz.unofficial.host}")
    private String apiHost;

    private final RestTemplate restTemplate = new RestTemplate();
    private final String BASE_URL = "https://unofficial-cricbuzz.p.rapidapi.com";

    private HttpHeaders getHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("x-rapidapi-key", apiKey);
        headers.set("x-rapidapi-host", apiHost);
        return headers;
    }

    @Cacheable("liveMatches")
    public Object getLiveMatches() {
        String url = BASE_URL + "/matches/list?matchState=live";
        HttpEntity<String> entity = new HttpEntity<>(getHeaders());
        ResponseEntity<Object> response = restTemplate.exchange(url, HttpMethod.GET, entity, Object.class);
        return response.getBody();
    }

    @Cacheable("upcomingMatches")
    public Object getUpcomingMatches() {
        String url = BASE_URL + "/matches/list?matchState=upcoming";
        HttpEntity<String> entity = new HttpEntity<>(getHeaders());
        ResponseEntity<Object> response = restTemplate.exchange(url, HttpMethod.GET, entity, Object.class);
        return response.getBody();
    }

    @Cacheable("recentMatches")
    public Object getRecentMatches() {
        String url = BASE_URL + "/matches/list?matchState=recent";
        HttpEntity<String> entity = new HttpEntity<>(getHeaders());
        ResponseEntity<Object> response = restTemplate.exchange(url, HttpMethod.GET, entity, Object.class);
        return response.getBody();
    }

    @Cacheable("schedule")
    public Object getSchedule() {
        String url = BASE_URL + "/matches/get-schedules?matchState=upcoming";
        HttpEntity<String> entity = new HttpEntity<>(getHeaders());
        ResponseEntity<Object> response = restTemplate.exchange(url, HttpMethod.GET, entity, Object.class);
        return response.getBody();
    }

    public Object getMatchScorecard(String matchId) {
        String url = BASE_URL + "/matches/get-scorecard?matchId=" + matchId;
        HttpEntity<String> entity = new HttpEntity<>(getHeaders());
        ResponseEntity<Object> response = restTemplate.exchange(url, HttpMethod.GET, entity, Object.class);
        return response.getBody();
    }

    public Object getTeamResults(String teamId) {
        String url = BASE_URL + "/teams/get-results?teamId=" + teamId;
        HttpEntity<String> entity = new HttpEntity<>(getHeaders());
        ResponseEntity<Object> response = restTemplate.exchange(url, HttpMethod.GET, entity, Object.class);
        return response.getBody();
    }

    public Object getTeamSchedule(String teamId) {
        String url = BASE_URL + "/teams/get-schedules?teamId=" + teamId;
        HttpEntity<String> entity = new HttpEntity<>(getHeaders());
        ResponseEntity<Object> response = restTemplate.exchange(url, HttpMethod.GET, entity, Object.class);
        return response.getBody();
    }

    @Cacheable("iccRankings")
    public Object getICCRankings(String category, String formatType) {
        String url = BASE_URL + "/stats/get-icc-rankings?category=" + category + "&formatType=" + formatType + "&isWomen=0";
        HttpEntity<String> entity = new HttpEntity<>(getHeaders());
        ResponseEntity<Object> response = restTemplate.exchange(url, HttpMethod.GET, entity, Object.class);
        return response.getBody();
    }

    @Cacheable("seriesMatches")
    public Object getSeriesMatches(String seriesId) {
        String url = BASE_URL + "/series/get-matches?seriesId=" + seriesId;
        HttpEntity<String> entity = new HttpEntity<>(getHeaders());
        ResponseEntity<Object> response = restTemplate.exchange(url, HttpMethod.GET, entity, Object.class);
        return response.getBody();
    }

    @Cacheable("pointsTable")
    public Object getPointsTable(String seriesId) {
        String url = BASE_URL + "/series/get-points-table?seriesId=" + seriesId;
        HttpEntity<String> entity = new HttpEntity<>(getHeaders());
        ResponseEntity<Object> response = restTemplate.exchange(url, HttpMethod.GET, entity, Object.class);
        return response.getBody();
    }

    @Cacheable("allTeams")
    public Object getAllTeams() {
        String url = BASE_URL + "/teams/list";
        HttpEntity<String> entity = new HttpEntity<>(getHeaders());
        ResponseEntity<Object> response = restTemplate.exchange(url, HttpMethod.GET, entity, Object.class);
        return response.getBody();
    }

    public Object getTeamPlayers(String teamId) {
        String url = BASE_URL + "/teams/get-players?teamId=" + teamId;
        HttpEntity<String> entity = new HttpEntity<>(getHeaders());
        ResponseEntity<Object> response = restTemplate.exchange(url, HttpMethod.GET, entity, Object.class);
        return response.getBody();
    }
}