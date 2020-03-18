import React from 'react'
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchUsers } from '../actions/user/action';

class Users extends React.Component {
    state = {
        users: { users : [] }
    }

    componentDidMount() {
        //this.retrieveUsers();
        this.props.fetchUsers();
        console.log("user component mounted");
        console.log(this.state);
    }

    render() {
        console.log(this.state.users);
        console.log("RENDER USER");
        return (
            <div className="users-page">
                <p>USERS</p>
                <ul>
                    { this.state.users.users.map(user => <li>{user.name}</li>)}
                </ul>
            </div>
        )
    }
}


const mapStateToProps = state =>  {
    console.log("MAP STATE TO PROPS");
    console.log(state);
    return { users: state.users.users }
}
export default connect(
    mapStateToProps,
    {
        fetchUsers
    }
)(Users);