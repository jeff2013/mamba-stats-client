import axios from 'axios';
import { SET_GAME } from '../actions';

export const fetchActiveGame = (sessionId) => dispatch => {
    return axios.get(`http://localhost:3000/game/${sessionId}`, {
        headers: {
            'Authorization' : localStorage.getItem('token')
        }
    }).then(res => dispatch(setGame(res.data)))
    .catch(err => {
        throw(err);
    })
}

const setGame = (game) => {
    return {
        type: SET_GAME,
        payload: game
    }
}

export const createGame = (homeTeamId, awayTeamId, sessionId) => {
    return (dispatch) => {
        return axios.post('http://localhost:3000/game', {
            home_team_id: homeTeamId,
            away_team_id: awayTeamId,
            sessionId: sessionId
        }, {
            headers: {
                'Authorization' : localStorage.getItem('token')
            }
        })
        .then(res => {
            dispatch(setGame(res.data))
        })
        .catch(err => {
            throw(err);
        })
    }
 }

 export const addGameStats = (teamType, gameId, userId, statType) => {
     return (dispatch) => {
        return axios.post('http://localhost:3000/game/stats', {
            gameId: gameId,
            userId: userId,
            teamType: teamType,
            statType: statType,
        }, {
            headers: {
                'Authorization' : localStorage.getItem('token')
            }
        })
        .then(res => {
            dispatch(setGame(res.data))
        })
        .catch(err => {
            throw(err);
        })
     }
 }

 export const endGame = (gameId) => {
     return (dispatch) => {
         return axios.post('http://localhost:3000/game/end', {
             gameId: gameId
         }, {
            headers: {
                'Authorization' : localStorage.getItem('token')
            }
         })
         .then(res => {
             dispatch(setGame(res.data))
         })
         .catch(err => {
            throw(err);
        })
     }
 }