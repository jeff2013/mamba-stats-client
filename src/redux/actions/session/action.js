import axios from 'axios';
import { SET_SESSION, ADD_SESSION } from '../actions';

export const fetchSession = () => dispatch => {
    return axios.get('http://localhost:3000/session', {
        headers: {
            'Authorization' : localStorage.getItem('token')
        }
    }).then(res => dispatch(setSession(res.data)))
    .catch(err => {
        throw(err)
    })
}

const setSession = (session) => {
    console.log(session);
    return {
        type: SET_SESSION,
        payload: session
    }
}

const addSession = (session) => {
    return {
        type: ADD_SESSION,
        payload: session
    }
}

export const createSession = () => dispatch => {
    return axios.post('http://localhost:3000/session', {}, {
        headers: {
            'Authorization' : localStorage.getItem('token')
        }
    })
        .then(res => dispatch(addSession(res.data)))
        .catch(err => {
            throw(err)
        })
}