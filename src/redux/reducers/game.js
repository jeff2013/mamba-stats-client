import { ADD_STATS } from '../actions/actions';

// FIX ME we probably don't want to just store all stats in an array...
const games = (state = [], action) => {
    switch (action.type) {
        case ADD_STATS:
            return [...state, action.payload]
        default:
            return state;
    }
}

export default games;