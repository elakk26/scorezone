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

    @GetMapping("/leagues")
    public Object getAllLeagues() {
        return footballService.getAllLeagues();
    }

    @GetMapping("/teams/{leagueId}")
    public Object getTeamsByLeague(@PathVariable String leagueId) {
        return footballService.getTeamsByLeague(leagueId);
    }

    @GetMapping("/matches/{leagueId}")
    public Object getMatchesByLeague(@PathVariable String leagueId) {
        return footballService.getMatchesByLeague(leagueId);
    }

    @GetMapping("/score/{eventId}")
    public Object getMatchScore(@PathVariable String eventId) {
        return footballService.getMatchScore(eventId);
    }

    @GetMapping("/standings/{leagueId}")
    public Object getLeagueStandings(@PathVariable String leagueId) {
        return footballService.getLeagueStandings(leagueId);
    }
}