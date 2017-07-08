import React from 'react';
import { bind } from '../../utils/reactness';

import style from './Board.css';
import Button from '../Global/Button';
import Input from './Input';

class Comment extends React.Component {

    constructor() {
        super();
        this.state = {
            updating: false
        }
        bind(this, [
            'toggleUpdate',
            'handleUpdate',
            'handleRemove'
        ]);
    }

    toggleUpdate() {
        this.setState({ updating: !this.state.updating });
    }

    handleUpdate(input) {
        let text = input.value;
        if (text !== this.props.data.text) {
            this.props.onUpdate({
                id: this.props.data.id,
                text
            });
        }
        this.toggleUpdate();
    }

    handleRemove() {
        this.props.onRemove(this.props.data.id);
    }

    render() {
        if (this.state.updating) {
            return (
                <div className={style.comment} >
                    <Input
                        defaultValue={this.props.data.text}
                        onEnter={this.handleUpdate}
                    />
                </div>
            )
        }
        return (
            <div className={style.comment} >
                <div className={style.text}>
                    {this.props.data.text}
                </div>
                <div className={style.panel}>
                    <Button
                        label='edit'
                        className='edit'
                        onClick={this.toggleUpdate}
                    />
                    <Button
                        label='×'
                        className='delete'
                        onClick={this.handleRemove}
                    />
                </div>
            </div>
        )
    }

}

export default Comment;