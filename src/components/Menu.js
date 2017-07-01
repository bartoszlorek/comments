import React from 'react';
import MenuLink from './MenuLink';

export default function (props) {
    return (
        <ul className='menu'>
            <MenuLink to='/' label='board' />
            <MenuLink to='/user' label='user' />
        </ul>
    )
}