import React from 'react';
import style from './Comment.css';

export default function (props) {
    return (
        <div className={style.comment}>
            {props.text}
        </div>
    )
}