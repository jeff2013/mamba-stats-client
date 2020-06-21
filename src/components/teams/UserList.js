import React from "react";
import { connect } from "react-redux";
import { fetchUsers } from '../../redux/actions/user/action';
import '../../styles/components/teams/team-user-list.scss';
import { useEffect } from "react";
import SelectUser from './SelectUser';

function UserList({users, canSelect, onChange, fetchUsers}) {

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers])

     return (
        <ul className="user-list">
            {users && users.length
            ? users.map((user, index) => {
                return <SelectUser key={`user-${user.id}`} user={user} selectUser={(user, isSelected) => onChange(user, isSelected)} canSelect={canSelect}></SelectUser>
                })
            : "No users, yay!"}
        </ul>
    )
}

/**
 * Called every time redux store updates
 * @param {*} state 
 */
const mapStateToProps = state =>  {
    return { users: state.users.users }
}

export default connect(
    mapStateToProps,
    {
        fetchUsers
    }
)(UserList);