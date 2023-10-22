import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

function TeamInfo() {
    const [team, setTeam] = useState('');
    const { id } = useParams();

    useEffect(() => {
        fetch("/teams/" + id)
            .then((res) => res.json())
            .then((teamObj) => {
                setTeam(teamObj)
                console.log(team)
            });
    }, []);


    return (
        <div className='TeamInfo container'>
            <h1>Team Info</h1>
            <h1>{team.team_name}</h1>

        </div>
    )
}

export default TeamInfo;