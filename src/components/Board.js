import React from 'react';
import { connect } from 'react-redux';
import { addComment } from '../redux/actions';

import Comment from './Comment';

function board({ comments }) {
    return (
        <div className='board'>
            {comments.map((comment, i) =>
                <Comment
                    key={i}
                    text={comment.text}
                />
            )}
        </div>
    )
}

function mapStateToProps(state) {
    return {
        comments: state.comments
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addComment: (value) => dispatch(addComment(value))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(board);