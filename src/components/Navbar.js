import React, { Component } from 'react'
import { NavLink } from "react-router-dom";
import '../styles/App.sass'


export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg">
                <a className="navbar-brand" href="/all-team-rankings">League of Legends | Global Power Rankings</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav" id="navbarNav">
                        <li className="nav-item">
                            <NavLink className="nav-link text-white" to="/all-team-rankings">All Team Rankings</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-white" to="/select-team-rankings" >Select Team Ranking</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-white" to="/tournament-team-rankings">Tournament Team Rankings</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}
