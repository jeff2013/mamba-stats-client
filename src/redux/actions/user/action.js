import axios from 'axios';
import { SET_USERS, ADD_USER } from '../actions';

export function fetchUsers() {
    return function fetchUsers(dispatch) {
        axios.get('http://localhost:3000/user').then(res => {
            dispatch(setUsers(res.data));
        }) 
    }
}

function setUsers(data) {
    return {
        type: SET_USERS,
        payload: data
    }
}

export const addUser = (user) => {
    return {
        type: ADD_USER,
        payload: user
    }
}

export const createUser = ({name}) => {
    return (dispatch) => {
        return axios.post('http://localhost:3000/user', {name: name})
            .then(res => {
                dispatch(addUser(res.data))
            })
            .catch(err => {
                throw(err);
            });
    }
}