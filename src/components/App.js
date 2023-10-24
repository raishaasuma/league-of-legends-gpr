import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AllTeamRankings from "../routes/AllTeamRankings.jsx";
import SelectTeamRankings from "../routes/SelectTeamRankings.jsx";
import TournamentTeamRankings from "../routes/TournamentTeamRankings.jsx";
import TeamInfo from "../routes/TeamInfo.jsx";
import Navbar from "./Navbar.js";
import '../styles/App.sass'

function App() {

  return (
    <Router>
      <main className="App">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/all-team-rankings" />}
          />
          <Route path="/all-team-rankings" element={<AllTeamRankings />}></Route>
          <Route path="/select-team-rankings" element={<SelectTeamRankings />}></Route>
          <Route path="/tournament-team-rankings" element={<TournamentTeamRankings />}></Route>
          <Route path="/TeamInfo/:id" element={<TeamInfo />}></Route>
        </Routes>
      </main>
    </Router>
  );
}

export default App;
