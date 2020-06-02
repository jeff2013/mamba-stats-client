import { ADD_GROUP } from '../actions/actions';

const initialState = {
    id: ''
}

const groups = (state = initialState, action) => {
    switch (action.type) {
        case ADD_GROUP: 
            return {
                ...action.payload
            }
        default:
            return state;
    }
}

export default groups;