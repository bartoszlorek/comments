import { combineReducers } from 'redux';
import { ADD_COMMENT } from './actions';

function comments(state = [], action) {
    if (action.type === ADD_COMMENT) {
        return [...state, action.data];
    }
    return state;
}

const reducers = combineReducers({
    comments
});

export default reducers;