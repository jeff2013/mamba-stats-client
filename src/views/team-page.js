import React from 'react';
import '../styles/pages/team-page.scss';
import TeamUsers from '../components/teams/TeamUsers';
import TeamList from '../components/teams/TeamList';

export default class TeamPage extends React.Component {

    render() {
        return (
            <div className="teams-page">
                <h1>SELECT TEAMS</h1>
                <p className="subheading">Pick 2 Teams</p>
                <TeamUsers isEmpty/>
                <TeamList/>
            </div>
        )
    }

}