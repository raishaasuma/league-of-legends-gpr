import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../styles/App.sass';

const API_URL = process.env.REACT_APP_API_URL + "/teams";

function AllTeamRankings() {
    const [teams, setTeams] = useState([]);
    const [teamname, setTeamname] = useState('');
    const [filteredTeams, setFilteredTeams] = useState(teams);

    useEffect(() => {
        fetch(API_URL, { mode: 'cors' })
            .then((res) => res.json())
            .then((teams) => {
                setTeams(teams)
                setFilteredTeams(teams);
            });
    }, []);

    const handleInputChange = (e) => {
        const query = e.target.value;
        setTeamname(query)

        const filteredTeams = teams.filter((team =>
            team.team_name.toLowerCase().includes(query.toLowerCase())
        ));
        setFilteredTeams(filteredTeams);
    }

    // TODO: Replace with "current" slug
    const currentTeamRankings = filteredTeams.filter((team =>
        team.slug.toLowerCase().includes("ljl_summer_2023")
    ));

    const teamsRanked = currentTeamRankings.map((team, index) =>
        <Link className="row team-item" key={team.id} to={`/teamInfo/${team.id}`}>
            <div className="team-rank col-2">{team.rank}</div>
            <div className="team-logo col-2">
                <img className="logo" src="https://am-a.akamaihd.net/image?resize=140:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1631820065346_cloud9-2021-worlds.png" alt="" />
            </div>
            <div className="team-name col-8">
                {team.team_name}
            </div>
        </Link>
    );

    return (
        <div className="AllTeamRankings container">
            <div className="filtered-teams overflow-auto">
                <input className="searchbar" type="text"
                    value={teamname}
                    onChange={handleInputChange}
                    placeholder='Type to search' />
                {teamsRanked}
            </div>
        </div >
    );
}

export default AllTeamRankings;