import { combineReducers } from 'redux';
import { ADD_COMMENT } from './actions';

function comments(state = [], action) {
    if (action.type === ADD_COMMENT) {
        const { data } = action;
        data.text = data.text.trim();
        return [...state, data];
    }
    return state;
}

const reducers = combineReducers({
    comments
});

export default reducers;