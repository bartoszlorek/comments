import { URL, DATA_ARRAY } from '../constants';

const updateComments = ({ dispatch, actions }) => {
    return dispatch(actions.getComments())
};

export default {
    getComments: {
        url: `${URL}/comment`,
        reducerName: 'comments',
        transformer: DATA_ARRAY
    },
    addComment: {
        url: `${URL}/comment`,
        virtual: true,
        options: {
            method: 'POST'
        },
        postfetch: [updateComments]
    },
    removeComment: {
        url: `${URL}/comment/:id/delete`,
        virtual: true,
        options: {
            method: 'POST'
        },
        postfetch: [updateComments]
    }
}