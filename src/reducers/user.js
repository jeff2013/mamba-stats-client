import { SET_USERS } from '../actions/actions'

const users = (state = {}, action) => {
    switch (action.type) {
        case SET_USERS:
            console.log(action.type);
            console.log(action.payload);
            console.log(state);
            return Object.assign({}, state, {
                users: action.payload
            });
        default:
            return state;
    }
}

export default users;