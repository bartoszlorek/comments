import { DATA_ARRAY, POST } from '../constants';

const updateComments = ({ dispatch, actions }) => {
    return dispatch(actions.getComments())
};

export default {
    getComments: {
        url: '/comment',
        reducerName: 'comments',
        transformer: DATA_ARRAY
    },
    addComment: {
        url: '/comment',
        options: POST,
        virtual: true,
        postfetch: [updateComments]
    },
    updateComment: {
        url: '/comment/:id/update',
        options: POST,
        virtual: true,
        postfetch: [updateComments]
    },
    removeComment: {
        url: '/comment/:id/delete',
        options: POST,
        virtual: true,
        postfetch: [updateComments]
    }
}