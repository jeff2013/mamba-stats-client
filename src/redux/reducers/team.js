import { SET_TEAMS } from '../actions/actions'

/**
 * Reducers must be pure functions
 */

const teams = (state = [], action) => {
    switch (action.type) {
        case SET_TEAMS:
            return [...action.payload]
        default:
            return state;
    }
}

export default teams;