package com.scorezone.backend.controller;

import com.scorezone.backend.service.FootballService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/football")
@CrossOrigin(origins = "*")
public class FootballController {

    private final FootballService footballService;

    public FootballController(FootballService footballService) {
        this.footballService = footballService;
    }

    @GetMapping("/live")
    public Object getLiveMatches() {
        return footballService.getLiveMatches();
    }

    @GetMapping("/upcoming")
    public Object getUpcomingMatches() {
        return footballService.getUpcomingMatches();
    }

    @GetMapping("/recent")
    public Object getRecentMatches() {
        return footballService.getRecentMatches();
    }

    @GetMapping("/standings/{leagueId}")
    public Object getStandings(@PathVariable String leagueId) {
        return footballService.getStandings(leagueId);
    }

    @GetMapping("/teams/{leagueId}")
    public Object getAllTeams(@PathVariable String leagueId) {
        return footballService.getAllTeams(leagueId);
    }

    @GetMapping("/team/{teamId}")
    public Object getTeamMatches(@PathVariable String teamId) {
        return footballService.getTeamMatches(teamId);
    }
}