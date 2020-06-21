import React from 'react'
import { createTeam } from '../redux/actions/team/action';
import '../styles/pages/create-team-page.scss';
import { useState } from 'react';
import { ReactComponent as PlayerUnselected } from '../assets/player-unselected.svg';
import { connect } from 'react-redux';
import UserList from '../components/teams/UserList';
import { useHistory } from 'react-router-dom';
import { ReactComponent as Plus} from '../assets/plus.svg';

function CreateTeamPage(props) {
    const [team, setTeam] = useState(new Map())
    const history = useHistory();

    const [teamName, setTeamName] = useState('');
    const [teamFull, setTeamFull] = useState(false);
    const minPlayers = 5;

    const toggleUser = (user, isSelected) => {
        if (isSelected) {
            setTeamFull(team.size + 1 >= minPlayers);
            setTeam(new Map(team.set(user.id, user)))
        } else {
            setTeamFull(team.size - 1 >= minPlayers);
            team.delete(user.id);
            setTeam(new Map(team))
        }
    }

    const submitTeam = () => {
        const players = Array.from(team.keys());
        if (players.length === minPlayers) {
            props.onCreateTeam(teamName, players);
            history.push('/teams');
        } else {
             /**
             * TODO: SHOW ERROR BANNER OR MODAL
             */
        }
    }

    const close = () => {
        history.goBack();
    }

    return (
        <div className="create-team-page">
            <header>
                <h1>CREATE TEAM</h1>
                <button onClick={() => close()}><Plus/></button>
            </header>
            <div className="input-container team-name">
                <input type="text" name="Team Name" value={teamName} onChange={e => setTeamName(e.target.value)}></input>
            </div>
            <div className="players-selected-container">
                <TeamSelected team={team}></TeamSelected>
            </div>
            <p className="avaialble-header">AVAILABLE PLAYERS</p>
            <UserList onChange={(user, isSelected) => toggleUser(user, isSelected)} canSelect={!teamFull}></UserList>
            <button className="done-button primary" onClick={() => submitTeam()}>Done</button>
        </div> 
    )
}

function TeamSelected(props) {
    const team = props.team;
    const maxPlayers = 5;
    const items = [];
    
    [...team.keys()].map(userId => {
        return items.push(team.get(userId))
    });

    const emptyPlayers = maxPlayers - items.length;

    for(var i = 0; i < emptyPlayers; i ++) {
        items.push({'id': `item-${i}`, 'name' : ''})
    }

    return (
        <ul className="team-selected-list">    
            {items.map(item => (
                <li key={`team-user-${item.id}`} >
                    <PlayerUnselected className={"player " + (item.name === '' ? '' : 'selected' )}></PlayerUnselected>
                    <p>{item.name}</p>
                </li>
                ))
            }
        </ul>   
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onCreateTeam: (name, players) => {
            dispatch(createTeam(name, players));
        }
    }
}
export default connect(
    null,
    mapDispatchToProps
)(CreateTeamPage);