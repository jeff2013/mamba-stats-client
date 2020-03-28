import React from "react";
import { connect, useSelector } from "react-redux";
import { fetchUsers } from '../../redux/actions/user/action';
import '../../styles/components/teams/team-user-list.scss';
import { useEffect } from "react";
import SelectUser from './SelectUser';

function UserList(props) {

    const users = useSelector(state => state.users);

    const onChange = props.onChange;

    useEffect(() => {
        props.fetchUsers();
    }, [])

     return (
        <ul className="user-list">
            {users && users.length
            ? users.map((user, index) => {
                return <SelectUser key={`user-${user.id}`} user={user} select={(user, isSelected) => onChange(user, isSelected)}></SelectUser>
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
    return { users: state.users }
}

export default connect(
    mapStateToProps,
    {
        fetchUsers
    }
)(UserList);