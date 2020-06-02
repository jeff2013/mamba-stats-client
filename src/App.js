import React from 'react';
import User from './views/user';
import TeamPage from './views/team-page';
import CreateTeamsPage from './views/create-team-page';
import LoginPage from './views/login-page';
import GamePage from './views/game-page';
import './App.css';
import './_variables.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/teams">Teams</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/game">Game</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/game">
            <GamePage/>
          </Route>
          <Route path="/login">
            <LoginPage/>
          </Route>
          <Route path="/teams/create">
            <CreateTeamsPage/>
          </Route>
          <Route path="/users">
            <User />
          </Route>
          <Route path="/teams">
            <TeamPage />
          </Route>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

export default App;
