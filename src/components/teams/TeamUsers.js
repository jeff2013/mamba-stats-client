import React from 'react';
import '../../styles/components/teams/team-users.scss'
import { ReactComponent as Plus} from '../../assets/plus.svg';
import { useHistory } from 'react-router-dom';

export default function TeamUsers(props) {
    console.log(props);

    const isEmpty = props.isEmpty;
    const team = props.team;
    var users = !isEmpty && team && team.users ? team.users : [];
    const history = useHistory();

    return (
        <div className="team-users-container">
            {isEmpty ? 
                <div className="empty">
                    <button onClick={() => history.push('/teams/create')}>
                        <Plus />
                        <br />
                        <p>Create New Team</p>
                    </button>
                </div>
                :
                <div className="user-list">
                    <p>{team.name}</p>
                    <ul>
                        {users && users.length > 0 
                        ? users.map((user, index) => {
                            return <li key={`user-${user.id}`}>
                                <p>{user.name}</p>
                            </li>
                        })
                        :
                        <div>
                            <p>No Users</p>
                        </div>
                        }
                    </ul>                   
                </div>
            }
        </div>
    )
}