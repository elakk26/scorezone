package com.scorezone.backend.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

@Service
@Slf4j
public class CricketService {

    @Value("${cricket.api.key}")
    private String apiKey;

    @Value("${cricket.api.host}")
    private String apiHost;

    private final RestTemplate restTemplate = new RestTemplate();
    private final String BASE_URL = "https://free-cricbuzz-cricket-api.p.rapidapi.com";

    private HttpHeaders getHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("x-rapidapi-key", apiKey);
        headers.set("x-rapidapi-host", apiHost);
        return headers;
    }

    @Cacheable("liveMatches")
    public Object getLiveMatches() {
        String url = BASE_URL + "/cricket-livescores";
        HttpEntity<String> entity = new HttpEntity<>(getHeaders());
        ResponseEntity<Object> response = restTemplate.exchange(url, HttpMethod.GET, entity, Object.class);
        return response.getBody();
    }

    @Cacheable("upcomingMatches")
    public Object getUpcomingMatches() {
        String url = BASE_URL + "/cricket-schedule";
        HttpEntity<String> entity = new HttpEntity<>(getHeaders());
        ResponseEntity<Object> response = restTemplate.exchange(url, HttpMethod.GET, entity, Object.class);
        return response.getBody();
    }

    @Cacheable("recentMatches")
    public Object getRecentMatches() {
        String url = BASE_URL + "/cricket-series";
        HttpEntity<String> entity = new HttpEntity<>(getHeaders());
        ResponseEntity<Object> response = restTemplate.exchange(url, HttpMethod.GET, entity, Object.class);
        return response.getBody();
    }

    @Cacheable("allTeams")
    public Object getAllTeams() {
        String url = BASE_URL + "/cricket-teams";
        HttpEntity<String> entity = new HttpEntity<>(getHeaders());
        ResponseEntity<Object> response = restTemplate.exchange(url, HttpMethod.GET, entity, Object.class);
        return response.getBody();
    }

    public Object getTeamPlayers(String teamId) {
        String url = BASE_URL + "/cricket-players?teamid=" + teamId;
        HttpEntity<String> entity = new HttpEntity<>(getHeaders());
        ResponseEntity<Object> response = restTemplate.exchange(url, HttpMethod.GET, entity, Object.class);
        return response.getBody();
    }
}