import axios from 'axios';
import { SET_TEAMS, ADD_TEAM } from '../actions';

export const setTeams = (teams) => {
    return {
        type: SET_TEAMS,
        payload: teams
    }
}

export const fetchTeams = () => {
    return (dispatch) => {
        return axios.get('http://localhost:3000/team', {
            headers: {
                'Authorization' : localStorage.getItem('token')
            }
        }).then(res => {
            dispatch(setTeams(res.data))
        }).catch(err => {
            throw(err);
        });
    }
}

export const addTeam = (team) => {
    return {
        type: ADD_TEAM,
        payload: team
    }
}

export const createTeam = (name, players) => {
    return (dispatch) => {
        return axios.post('http://localhost:3000/team', 
            {
                team: {name: name, players: players}
            },{
                headers: {
                    'Authorization' : localStorage.getItem('token')
                }
            })
            .then(res => {
                dispatch(addTeam(res.data))
            })
            .catch(err => {
                throw(err);
            })
    }
}