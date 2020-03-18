import { SET_USERS } from '../actions/actions'

const initialState = {
    users: []
}

const users = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case SET_USERS:
            return [...state, ...action.payload]
        default:
            return state;
    }
}

export default users;