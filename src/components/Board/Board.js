import React from 'react';
import { connect } from 'react-redux';
import { fetchComments } from '../../actions/comment';
import { bind } from '../../utils/reactness';

import style from './Board.css';
import Comment from '../Comment/Comment';
import Input from './Input';

class Board extends React.Component {

    constructor(props) {
        super(props);
        bind(this, ['handleKeyUp']);
    }

    componentWillMount() {
        this.props.fetchComments();
    }

    handleKeyUp(e) {
        // if (!e.shiftKey && e.key === 'Enter') {
        //     this.props.addComment({
        //         text: e.target.value
        //     });
        //     e.target.value = '';
        // }
    }

    render() {
        return (
            <div className={style.board}>
                {this.props.comments.map((comment, i) =>
                    <Comment
                        key={i}
                        text={comment.text}
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
        comments: state.comments.data,
        loading: state.comments.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchComments: () => dispatch(fetchComments())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Board);