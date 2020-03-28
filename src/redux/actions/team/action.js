import axios from 'axios';
import { SET_TEAMS } from '../actions';

export const setTeams = (teams) => {
    return {
        type: SET_TEAMS,
        payload: teams
    }
}

export const fetchTeams = () => {
    return (dispatch) => {
        return axios.get('http://localhost:3000/team').then(res => {
            dispatch(setTeams(res.data))
        }).catch(err => {
            throw(err);
        });
    }
}