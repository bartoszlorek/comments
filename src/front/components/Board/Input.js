import React from 'react';
import classNames from 'classnames';
import { omit } from 'lodash';
import { bind } from '../../utils/reactness';

import style from './Board.css';
import Textarea from 'react-autosize-textarea';

function isEnter(e) {
    return e.key === 'Enter' && !e.shiftKey;
}

class Input extends React.Component {

    constructor() {
        super();
        bind(this, [
            'handleEnter'
        ]);
    }

    componentDidMount() {
        this.refs.input.textarea.focus();
    }

    handleEnter(e) {
        if (isEnter(e) && typeof this.props.onEnter === 'function') {
            e.preventDefault();
            if (e.target.value.trim() !== '') {
                this.props.onEnter(e.target);
                e.target.value = '';
            }
        }
    }

    render() {
        let props = omit(this.props, ['onEnter']);
        return (
            <Textarea
                {...props}
                ref={'input'}
                className={classNames(style.input, props.className)}
                onKeyDown={this.handleEnter} >
            </Textarea>
        )
    }

}

export default Input;