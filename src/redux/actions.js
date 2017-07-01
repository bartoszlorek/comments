const ADD_COMMENT = 'ADD_COMMENT';

export {
    ADD_COMMENT,
    addComment
}

function addComment(data) {
    return {
        type: ADD_COMMENT,
        data
    }
}