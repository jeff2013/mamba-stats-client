import React from "react";
import { connect } from "react-redux";
import { fetchUsers } from '../redux/actions/user/action';
import  User from '../components/User';
import '../styles/user-list.scss';


class UserList extends React.Component {

    componentDidMount() {
        this.props.fetchUsers();
    }

     render() {
         const users = this.props.users;
        return (
        <ul className="user-list">
            {users && users.length
            ? users.map((user, index) => {
                return <User key={`user-${user.id}`} player={user}></User>;
                })
            : "No users, yay!"}
        </ul>
        )
     };
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