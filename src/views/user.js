import React from 'react'
import UserList from '../components/UserList';
import '../styles/pages/user-page.scss';
import { ReactComponent as Plus} from '../assets/plus.svg';

export default class Users extends React.Component {
    constructor(props) {
        super(props);

        this.addUser = this.addUser.bind(this);
    }


    componentDidMount() {
        console.log("user component mounted");
    }

    addUser() {
        console.log("add user");
    }    

    render() {
        console.log("RENDER USER");
        return (
            <div className="users-page">
                <div className="header">
                    <h1>PLAYERS</h1>
                    <button onClick={this.addUser}>
                        <Plus></Plus>
                    </button>
                </div>
                <UserList/>
                
            </div>
        )
    }
}
