import React from 'react'
import UserList from '../components/UserList';

export default class Users extends React.Component {
    componentDidMount() {
        console.log("user component mounted");
    }

    render() {
        console.log("RENDER USER");
        return (
            <div className="users-page">
                <UserList/>
            </div>
        )
    }
}
