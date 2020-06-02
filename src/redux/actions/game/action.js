import axios from 'axios';
import { SET_GAME, ADD_GAME, ADD_STATS } from '../actions';

export const fetchActiveGame = () => dispatch => {
    return axios.get('http://localhost:3000/game', {
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

const startGame = (game) => {
    return {
        type: ADD_GAME,
        payload: game
    }
}

const setGameStat = (gameStat) => {
    return {
        type: ADD_STATS,
        payload: gameStat
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
            dispatch(startGame(res.data))
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
            dispatch(setGameStat(res.data))
        })
        .catch(err => {
            throw(err);
        })
     }
 }