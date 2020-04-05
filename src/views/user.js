import React from 'react'
import Modal from 'react-modal';
import UserList from '../components/UserList';
import '../styles/pages/user-page.scss';
import { ReactComponent as Plus} from '../assets/plus.svg';
import CreateUser from '../containers/CreateUser';

Modal.setAppElement(document.getElementById('root'))

export default class Users extends React.Component {
    state = {
        isModalOpen: false
    }

    addUser = () => {
        this.setState({isModalOpen: true})
    }
    
    closeModal = () => {
        this.setState({isModalOpen: false})
    }

    render() {
        return (
            <div className="users-page">
                <div className="header">
                    <h1>PLAYERS</h1>
                    <button onClick={this.addUser}>
                        <Plus/>
                    </button>
                </div>
                <UserList/>
                <Modal
                    isOpen={this.state.isModalOpen}
                    onRequestClose={this.closeModal}
                    className="add-player-modal">
                    <CreateUser onComplete={this.closeModal}/>
                </Modal>
            </div>
        )
    }
}
