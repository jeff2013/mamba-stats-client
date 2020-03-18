import axios from 'axios';
import { SET_USERS } from '../actions';

export function fetchUsers() {
    return function(dispatch) {
        axios.get('http://localhost:3000/user').then(res => {
            console.log(res.data);
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