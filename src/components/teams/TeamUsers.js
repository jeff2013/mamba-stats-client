import React from 'react';
import '../../styles/components/teams/team-users.scss'
import { useHistory } from 'react-router-dom';
import { ReactComponent as Caret } from '../../assets/chevron.svg';
import { useState } from 'react';

export default function TeamUsers({team, click}) {
    var users = team && team.users ? team.users : [];
    const [expandedTeams, setExpandedTeams] = useState(new Map());

    const teamSelected = (team) => {
        if(expandedTeams.has(team)) {
            expandedTeams.delete(team);
            setExpandedTeams(new Map(expandedTeams));
        } else {
            setExpandedTeams(new Map(expandedTeams.set(team, team)));
        }
        try {
            // Do nothing if this fails lol
            click();
        } catch {
        }
    }

    return (
        <div className="team-users-container">
            <div className={"team " + (expandedTeams.has(team.id) ? "expanded " : "hidden ")} onClick={() => teamSelected(team.id)}>
                <div className="team-header">
                    <p>{team.name}</p>
                    <Caret className={"dropdown " + (expandedTeams.has(team.id) ? "collapse " : "expand ")}/>
                </div>
                <ul className="team-user-list">
                    {
                        users && users.length > 0 
                        ? (
                            users.map((user, index) => (
                                <li key={`user-${user.id}`}>
                                    <p>{user.name}</p>
                                </li>
                                )
                            )
                        )
                        : <EmptyState/>
                    }
                </ul>                   
            </div>
        </div>
    )
}

 const EmptyState = () => {
    return (
         <div>
            <p>No Users</p>
        </div>
    )
}