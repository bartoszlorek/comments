import React from 'react';
import style from './Button.css';

export default function (props) {
    let name = style.button + ' ' + (props.className || '');

    return (
        <div
            className={name}
            onClick={props.onClick}
        >
            {props.label}
        </div>
    )
}