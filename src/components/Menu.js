import React from 'react';
import MenuLink from './MenuLink';

export default () => {
    return (
        <ul className='menu'>
            <MenuLink to='/' label='home' />
            <MenuLink to='/about' label='about' />
        </ul>
    );
};