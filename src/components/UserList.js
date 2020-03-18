import React from "react";
import { connect } from "react-redux";
import { fetchUsers } from '../redux/actions/user/action';


class UserList extends React.Component {

    componentDidMount() {
        console.log("Component did mount");
        
        this.props.fetchUsers();
    }

     render() {
         console.log("RENDER");
         const users = this.props.users;
        console.log(users)
        console.log(this.props.users);
        return (
        <ul className="user-list">
            {users && users.length
            ? users.map((user, index) => {
                return <li key={`user-${user.id}`}>{user.name}</li>;
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