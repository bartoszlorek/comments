import { combineReducers } from 'redux';
import { COMMENT_REQUEST, COMMENT_SUCCESS, COMMENT_FAILURE } from '../actions/comment';

function apiState(request, success, failure) {
    return (state, action) => {
        switch (action.type) {
            case request:
                return {
                    ...state,
                    loading: true
                }
            case success:
                return {
                    ...state,
                    data: action.payload,
                    loading: false
                }
            case failure:
                return {
                    ...state,
                    error: action.payload,
                    loading: false
                }
        }
    }
}

const getComment = apiState(
    COMMENT_REQUEST,
    COMMENT_SUCCESS,
    COMMENT_FAILURE
);


function comments(state = {
    loading: false,
    error: null,
    data: []

}, action) {
    switch (action.type) {
        case COMMENT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case COMMENT_SUCCESS:
            return {
                ...state,
                data: action.payload,
                loading: false
            }
        case COMMENT_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        default:
            return state;
    }
}

const reducers = combineReducers({
    comments
});

export default reducers;