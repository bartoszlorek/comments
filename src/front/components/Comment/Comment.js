import React from 'react';
import Button from '../Helpers/Button';

import style from './Comment.css';

export default function (props) {
    let onDelete = () => props.onDelete(props.id);

    return (
        <div className={style.comment} >
            <div className={style.text}>
                {props.text}
            </div>
            <div className={style.panel}>
                <Button label='edit' className='edit' />
                <Button label='×' className='delete' onClick={onDelete} />
            </div>
        </div>
    )
}