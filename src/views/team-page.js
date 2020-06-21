import React from 'react';
import '../styles/pages/team-page.scss';
import TeamList from '../components/teams/TeamList';
import { useHistory } from 'react-router-dom';
import { ReactComponent as Plus} from '../assets/plus.svg';

export default function TeamPage() {
    const history = useHistory();

    return (
        <div className="teams-page">
            <header className="header">
                <h1>Teams</h1>
            </header>
            <TeamList/>
            <button className="circle-add" onClick={() => history.push('/teams/create')}>
                <Plus/>
            </button>
        </div>
    )
}