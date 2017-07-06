import React from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import style from './Board.css';

export default function (props) {
    return (
        <TextareaAutosize
            className={style.input}
            onKeyUp={props.onKeyUp}>
        </TextareaAutosize>
    )
}