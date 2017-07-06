import React from 'react';
import { connect } from 'react-redux';
import api from '../../api';
import { bind } from '../../utils/reactness';

import style from './Board.css';
import Comment from '../Comment/Comment';
import Input from './Input';

class Board extends React.Component {

    constructor(props) {
        super(props);
        bind(this, [
            'handleKeyUp',
            'handleDelete'
        ]);
    }

    componentWillMount() {
        this.props.getComments();
    }

    handleKeyUp(e) {
        if (!e.shiftKey && e.key === 'Enter') {
            this.props.addComment({
                text: e.target.value
            });
            e.target.value = '';
        }
    }

    handleDelete(id) {
        this.props.removeComment(id);
    }

    render() {
        return (
            <div className={style.board}>
                {this.props.comments.map((comment, i) =>
                    <Comment
                        key={i}
                        id={comment._id}
                        text={comment.text}
                        onDelete={this.handleDelete}
                    />
                )}
                <Input
                    onKeyUp={this.handleKeyUp}
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        comments: state.comments.data
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getComments: () => dispatch(api.actions.getComments.sync()),
        addComment: (data) => dispatch(api.actions.addComment(data)),
        removeComment: (id) => dispatch(api.actions.removeComment({ id })),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Board);