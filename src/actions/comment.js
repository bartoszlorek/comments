import { CALL_API } from 'redux-api-middleware';

export const COMMENT_REQUEST = 'COMMENT_REQUEST';
export const COMMENT_SUCCESS = 'COMMENT_SUCCESS';
export const COMMENT_FAILURE = 'COMMENT_FAILURE';

export function fetchComments() {
    return {
        [CALL_API]: {
            types: [COMMENT_REQUEST, COMMENT_SUCCESS, COMMENT_FAILURE],
            endpoint: 'http://localhost:8080/api/comment',
            method: 'GET'
        }
    }
}