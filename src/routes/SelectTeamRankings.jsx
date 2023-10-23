import { React, useState, useEffect } from "react";
import '../styles/Navbar.sass';
import '../styles/App.sass'

const API_URL = process.env.REACT_APP_API_URL + "/teams";


function SelectTeamRankings() {
    const [teams, setTeams] = useState([]);
    const [teamname, setTeamname] = useState('');
    const [filteredTeams, setFilteredTeams] = useState(teams);
    const [selectedTeams, setSelectedTeams] = useState([]);

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

        const unselectedTeams = teams.filter((team =>
            team.team_name.toLowerCase().includes(query.toLowerCase())
        ));
        setFilteredTeams(unselectedTeams);
    }

    function handleAddTeam(team) {
        // remove from filtered and teams
        setSelectedTeams(selectedTeams => [...selectedTeams, team]);

        let index = filteredTeams.indexOf(team);
        filteredTeams.splice(index, 1);
        index = teams.indexOf(team);
        teams.splice(index, 1);
        setTeams(teams);
        setFilteredTeams(filteredTeams);
    }

    function handleRemoveTeam(t) {
        // add to teams and maybe filtered
        const newList = selectedTeams.filter((team) => team.id !== t.id)
        setSelectedTeams(newList);
        setTeams(teams => [...teams, t])

        setFilteredTeams(filteredTeams => [...filteredTeams, t]);
    }

    function handleClearTeams() {
        console.log("clicked");

        setTeams(teams => [...teams, ...selectedTeams]);
        setSelectedTeams([]);
        setFilteredTeams(filteredTeams => [...filteredTeams, ...selectedTeams])
    }

    function runTeamRankSelected() {
        const sortedTeams = selectedTeams.sort(function (a, b) {
            return a.rank - b.rank;
        });
        console.log(sortedTeams);
        setSelectedTeams([...sortedTeams]);
    }

    //Show all teams
    const teamsRanked = filteredTeams.map((team, index) =>
        <div className="team-selector row" key={team.id}>
            <div className="team-name col-6">{team.team_name}</div>
            <div className="col-6">
                <button onClick={() => handleAddTeam(team)} className="btn add-button">Add</button>
            </div>
        </div>
    );

    //Show selected teams
    const teamsSelected = selectedTeams.map((team, index) =>
        <div className="team-selector row" key={team.id}>
            <div className="col-6">{team.team_name}</div>
            <div className="col-6">
                <button className="btn remove-button" onClick={() => handleRemoveTeam(team)}>Remove</button>
            </div>
        </div>
    );

    return (
        <div className="SelectTeamRankings container">
            <div className="row w-100">
                <div className="teams-to-select col-6 overflow-auto">
                    <input className="searchbar" type="text"
                        value={teamname}
                        onChange={handleInputChange}
                        placeholder='Type to search' />
                    {teamsRanked}
                </div>
                <div className="selected-teams col-6 overflow-auto">
                    <div className="button-bar row">
                        <div className="col-6">
                            <button onClick={() => handleClearTeams()} className="btn clear-button">
                                Clear
                            </button>
                        </div>
                        <div className="col-6">
                            <button onClick={() => runTeamRankSelected()} className="btn run-button">
                                Run
                            </button>
                        </div>
                    </div>
                    {teamsSelected}
                </div>
            </div>

        </div >
    );
}

export default SelectTeamRankings;