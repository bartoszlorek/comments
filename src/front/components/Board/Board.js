import React from 'react';
import { connect } from 'react-redux';
import { bind } from '../../utils/reactness';
import api from '../../api';

import style from './Board.css';
import Comment from './Comment';
import Input from './Input';

class Board extends React.Component {

    constructor(props) {
        super(props);
        bind(this, [
            'handleSubmit',
            'handleUpdate',
            'handleRemove'
        ]);
    }

    componentWillMount() {
        this.props.getComments();
    }

    handleSubmit(input) {
        this.props.addComment({
            text: input.value
        });
    }

    handleUpdate(data) {
        this.props.updateComment(data);
    }

    handleRemove(id) {
        this.props.removeComment(id);
    }

    render() {
        return (
            <div className={style.board}>
                {this.props.comments.map((comment) =>
                    <Comment
                        key={comment.id}
                        data={comment}
                        onUpdate={this.handleUpdate}
                        onRemove={this.handleRemove}
                    />
                )}
                <Input onEnter={this.handleSubmit} />
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
        updateComment: (data) => dispatch(api.actions.updateComment(data)),
        removeComment: (id) => dispatch(api.actions.removeComment({ id }))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Board);