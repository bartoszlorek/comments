import { URL_API, DATA_ARRAY } from '../constants';

const updateComments = ({ dispatch, actions }) => {
    return dispatch(actions.getComments())
};

export default {
    getComments: {
        url: `${URL_API}/comment`,
        reducerName: 'comments',
        transformer: DATA_ARRAY
    },
    addComment: {
        url: `${URL_API}/comment`,
        virtual: true,
        options: {
            method: 'POST'
        },
        postfetch: [updateComments]
    },
    updateComment: {
        url: `${URL_API}/comment/:id/update`,
        virtual: true,
        options: {
            method: 'POST'
        },
        postfetch: [updateComments]
    },
    removeComment: {
        url: `${URL_API}/comment/:id/delete`,
        virtual: true,
        options: {
            method: 'POST'
        },
        postfetch: [updateComments]
    }
}