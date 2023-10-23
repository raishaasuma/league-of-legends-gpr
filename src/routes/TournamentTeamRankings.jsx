import { React, useState, useEffect } from "react";
import '../styles/App.sass'

const API_URL = process.env.REACT_APP_API_URL + "/teams";

function TournamentTeamRankings() {
    const [teams, setTeams] = useState([]);
    const [tournament, setTournament] = useState('');
    const [filteredTeams, setFilteredTeams] = useState(teams);
    //const [isSelectedTournament, setSelectedTournament] = useState('');

    useEffect(() => {
        fetch(API_URL, { mode: 'cors' })
            .then((res) => res.json())
            .then((teams) => {
                setTeams(teams)
                setFilteredTeams(teams);
            });
    }, []);

    // TODO: Add filter by year
    const test = teams.map((team) => { return team.slug });
    const tournaments = [...new Set(test)];

    const renderDropdown = tournaments.map((tournament_name) =>
        <option key={tournament_name} value={tournament_name}>{tournament_name}</option>
    )

    const handleInputChange = (e) => {
        const query = e;
        setTournament(query)
        const filteredTeams = teams.filter((team =>
            team.slug.includes(query)
        ));
        setFilteredTeams(filteredTeams);
    }

    const renderFilterSidebar = tournaments.map((tournament_name) =>
        <div onClick={() => handleInputChange(tournament_name)} className={`sidebar-item row ${tournament == tournament_name ? "selected-tournament" : ""}`}>
            <div className="logo col-4">
                <img src="https://am-a.akamaihd.net/image?resize=120:&f=http%3A%2F%2Fstatic.lolesports.com%2Fleagues%2F1592594612171_WorldsDarkBG.png" alt="" />
            </div>
            <div className="tournament-name col-8" key={tournament_name} value={tournament_name}>{tournament_name}</div>
        </div>
    )

    const currentTeamRankings = filteredTeams.filter((team =>
        team.slug.toLowerCase().includes(tournament)
    ));

    const teamsRanked = currentTeamRankings.map((team, index) =>
        <div className="team-item row" key={team.team_name}>
            <div className="team-rank col-2">{team.rank}</div>
            <div className="team-logo col-2">
                <img className="logo" src="https://am-a.akamaihd.net/image?resize=140:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1631820065346_cloud9-2021-worlds.png" alt="" />
            </div>
            <div className="team-name col-8">
                {team.team_name}
            </div>
        </div>
    );

    return (
        <div className="TournamentTeamRankings container row">
            <div className="sidebar-filter overflow-auto col-4">
                {renderFilterSidebar}
            </div>
            <div className="filtered-teams overflow-auto col-8">
                {teamsRanked}
            </div>
        </div >
    );
}

export default TournamentTeamRankings;