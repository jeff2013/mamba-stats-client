import { SET_TEAMS, ADD_TEAM } from '../actions/actions'

/**
 * Reducers must be pure functions
 */

const teams = (state = [], action) => {
    switch (action.type) {
        case SET_TEAMS:
            return [...action.payload]
        case ADD_TEAM:
            return [...state, action.payload]
        default:
            return state;
    }
}

export default teams;