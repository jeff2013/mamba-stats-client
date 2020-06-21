import React from "react";
import { connect } from "react-redux";
import { fetchUsers } from '../redux/actions/user/action';
import  User from '../components/User';
import '../styles/user-list.scss';
import performRequest from "../helpers/authentication-redirect";
import { useHistory } from 'react-router-dom';
import { useEffect } from "react";
import { useState } from "react";
import Loading from '../components/Loading';

function UserList({users, fetchUsers}) {
    const [canRender, setCanRender] = useState(false)
    const history = useHistory();

    useEffect(() => {
        performRequest(fetchUsers, history, setCanRender);
    }, [history, fetchUsers])

    return (
        <div>
            { (canRender) 
                ?   <ul className="user-list">
                        {users && users.length
                        ? users.map((user, index) => {
                            return <User key={`user-${user.id}`} player={user}></User>;
                            })
                        : "No users, yay!"}
                    </ul>
                : <Loading></Loading>
            }
        </div>
    )
}

/**
 * Called every time redux store updates
 * @param {*} state 
 */
const mapStateToProps = state =>  {
    return { users: state.users.users }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUsers: () => {
            return dispatch(fetchUsers());
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserList);