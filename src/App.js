import React from 'react';
import User from './views/user';
import TeamPage from './views/team-page';
import CreateTeamsPage from './views/create-team-page';
import LoginPage from './views/login-page';
import GamePage from './views/game-page';
import moment from 'moment';
import { ReactComponent as Player } from './assets/player.svg';
import { ReactComponent as HomeIcon } from './assets/home.svg';
import { ReactComponent as TeamsIcon } from './assets/teams.svg';
import { ReactComponent as GameIcon } from './assets/ball.svg';

import './App.scss';
import './_variables.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="tab-bar">
          <ul>
            <li>
              <Link to="/">
                <HomeIcon className="icon"/>
              </Link>
            </li>
            <li>
              <Link to="/users">
                <Player className="icon"/>
              </Link>
            </li>
            <li>
              <Link to="/teams">
                <TeamsIcon className="icon"/>
              </Link>
            </li>
            <li>
              <Link to="/game">
                <GameIcon className="icon"/>
              </Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <PrivateRoute path="/game">
            <GamePage/>
          </PrivateRoute>
          <Route path="/login">
            <LoginPage/>
          </Route>
          <PrivateRoute path="/teams/create">
            <CreateTeamsPage/>
          </PrivateRoute>
          <PrivateRoute path="/users">
            <User />
          </PrivateRoute>
          <PrivateRoute path="/teams">
            <TeamPage />
          </PrivateRoute>
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
function PrivateRoute({ children, ...rest }) {

  const token = localStorage.getItem('token');
  const expiry = localStorage.getItem('expiry');
  // FIXME if expiry is within 24 hours, re-sign JWT token otherwise logout
  const authenticated = token && expiry && moment(expiry).diff(moment(), 'hours') > 0;

  return (
    <Route
      {...rest}
      render={({ location }) =>
        authenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default App;
