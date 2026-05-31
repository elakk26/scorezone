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

    @GetMapping("/teams")
    public Object getAllTeams() {
        return cricketService.getAllTeams();
    }

    @GetMapping("/scoreboard/{matchId}")
    public Object getMatchScoreboard(@PathVariable String matchId) {
        return cricketService.getMatchScoreboard(matchId);
    }

    @GetMapping("/players/{teamId}")
    public Object getTeamPlayers(@PathVariable String teamId) {
        return cricketService.getTeamPlayers(teamId);
    }
}