import { SET_SESSION, ADD_SESSION, ADD_STATS } from '../actions/actions';

const initialState = {}

const session = (state = initialState, action) => {
    switch(action.type) {
        case SET_SESSION:
            return {
                ...action.payload
            }
        case ADD_SESSION:
            return {
                ...action.payload
            }
        default: 
            return state;
    }
}

export default session;