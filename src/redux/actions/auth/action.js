import axios from 'axios';
import { ADD_GROUP } from '../actions';

export const login = (name, password) => {
    return (dispatch) => {
        return axios.post('http://localhost:3000/login', {
            name: name,
            password: password,
        })
            .then(res => {
                dispatch(addGroup(res.data));
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('expiry', res.data.expiry)
                return res.data.id;
            })
            .catch(err => {
                throw(err);
            });
    }
}

export const addGroup = (group) => {
    return {
        type: ADD_GROUP,
        payload: group
    }
}

export const createGroup = (name, password) => {
    return (dispatch) => {
        return axios.post('http://localhost:3000/group', {name: name, password: password})
            .then(res => {
                dispatch(addGroup(res.data));
                localStorage.setItem('token', res.data.token)
                return res.data.id;
            })
            .catch(err => {
                throw(err);
            });
    }
}