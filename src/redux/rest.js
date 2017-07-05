import reduxApi, { transformers } from 'redux-api';
import adapterFetch from "redux-api/lib/adapters/fetch";

const api = 'http://localhost:8080/api';

export default reduxApi({
    getComments: {
        url: `${api}/comment`,
        reducerName: 'comments',
        transformer: transformers.array
    },
    addComment: {
        url: `${api}/comment`,
        virtual: true,
        options: {
            method: 'POST'
        },
        postfetch: [
            ({ dispatch, actions }) => dispatch(actions.getComments())
        ]
    }
})
    .use('fetch', adapterFetch(fetch))
    .use("options", function () {
        return {
            headers: {
                'User-Agent': 'redux-api',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
    });