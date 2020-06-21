import axios from 'axios';
import { SET_USERS, ADD_USER } from '../actions';

export const fetchUsers = () => dispatch => {
    return axios.get('http://localhost:3000/user', {
        headers: {
            'Authorization' : localStorage.getItem('token')
        }
    }).then(res => {
        dispatch(setUsers(res.data));
    }).catch(err => {
        throw(err); 
    })
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
        return axios.post('http://localhost:3000/user', {name: name}, {
            headers: {
                'Authorization' : localStorage.getItem('token')
            }
        })
            .then(res => {
                dispatch(addUser(res.data))
            })
            .catch(err => {
                throw(err);
            });
    }
}