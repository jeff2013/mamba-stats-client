import { SET_USERS, ADD_USER } from '../actions/actions'

/**
 * Reducers must be pure functions
 */

const initialState = {
    users: []
}

const users = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return [...state, ...action.payload]
        case ADD_USER:
            return [...state, action.payload]
        default:
            return state;
    }
}

export default users;