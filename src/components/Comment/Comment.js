import React from 'react';
import style from './Comment.css';

export default function (props) {

    let onDelete = () => {
        if (confirm('delete?') ) {
            props.onDelete(props.id);
        }
    }
    
    return (
        <div
            className={style.comment}
            onClick={onDelete}
        >
            {props.text}
        </div>
    )
}