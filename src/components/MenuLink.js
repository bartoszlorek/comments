import React from 'react';
import { Link } from 'react-router-dom';

export default function (props) {
    return (
        <li>
            <Link to={props.to}>
                {props.label}
            </Link>
        </li>
    )
}