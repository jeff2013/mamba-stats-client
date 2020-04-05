import React from 'react'
import UserList from '../components/teams/UserList';
import '../styles/pages/create-team-page.scss';
import { useState } from 'react';
import { ReactComponent as PlayerUnselected } from '../assets/player-unselected.svg';

export default function CreateTeamPage(props) {
    const [team, setTeam] = useState(new Map())

    const toggleUser = (user, isSelected) => {
        if (isSelected) {
            setTeam(new Map(team.set(user.id, user)))
        } else {
            team.delete(user.id);
            setTeam(new Map(team))
        }
    }

    return (
        <div className="create-team-page">
            <h1>CREATE TEAM</h1>
            <div className="players-selected-container">
                <TeamSelected team={team}></TeamSelected>
            </div>
            <p className="avaialble-header">AVAILABLE PLAYERS</p>
            <UserList onChange={(user, isSelected) => toggleUser(user, isSelected)}></UserList>
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
