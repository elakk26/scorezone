package com.scorezone.backend.controller;

import com.scorezone.backend.service.CricketService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cricket")
@CrossOrigin(origins = "*")
public class CricketController {

    private final CricketService cricketService;

    public CricketController(CricketService cricketService) {
        this.cricketService = cricketService;
    }

    @GetMapping("/live")
    public Object getLiveMatches() {
        return cricketService.getLiveMatches();
    }

    @GetMapping("/upcoming")
    public Object getUpcomingMatches() {
        return cricketService.getUpcomingMatches();
    }

    @GetMapping("/recent")
    public Object getRecentMatches() {
        return cricketService.getRecentMatches();
    }

    @GetMapping("/schedule")
    public Object getSchedule() {
        return cricketService.getSchedule();
    }

    @GetMapping("/scorecard/{matchId}")
    public Object getMatchScorecard(@PathVariable String matchId) {
        return cricketService.getMatchScorecard(matchId);
    }

    @GetMapping("/team/{teamId}/results")
    public Object getTeamResults(@PathVariable String teamId) {
        return cricketService.getTeamResults(teamId);
    }

    @GetMapping("/team/{teamId}/schedule")
    public Object getTeamSchedule(@PathVariable String teamId) {
        return cricketService.getTeamSchedule(teamId);
    }

    @GetMapping("/rankings")
    public Object getICCRankings(
            @RequestParam String category,
            @RequestParam String formatType) {
        return cricketService.getICCRankings(category, formatType);
    }

    @GetMapping("/series/{seriesId}/matches")
    public Object getSeriesMatches(@PathVariable String seriesId) {
        return cricketService.getSeriesMatches(seriesId);
    }

    @GetMapping("/series/{seriesId}/points-table")
    public Object getPointsTable(@PathVariable String seriesId) {
        return cricketService.getPointsTable(seriesId);
    }

    @GetMapping("/teams")
    public Object getAllTeams() {
        return cricketService.getAllTeams();
    }

    @GetMapping("/players/{teamId}")
    public Object getTeamPlayers(@PathVariable String teamId) {
        return cricketService.getTeamPlayers(teamId);
    }
}