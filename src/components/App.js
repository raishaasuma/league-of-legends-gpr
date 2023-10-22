import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllTeamRankings from "../routes/AllTeamRankings";
import SelectTeamRankings from "../routes/SelectTeamRankings";
import TournamentTeamRankings from "../routes/TournamentTeamRankings";
import TeamInfo from "../routes/TeamInfo";
import Navbar from "./Navbar";
import '../styles/App.sass'

function App() {

  return (
    <Router>
      <main className="App">
        <Navbar />
        <Routes>
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
