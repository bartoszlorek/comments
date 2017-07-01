import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Menu from './Menu';
import Board from './Board';
import Account from './Account';

export default function (props) {
    return (
        <BrowserRouter>
            <div className='layout'>
                <Menu />
                <Route path='/' exact component={Board} />
                <Route path='/user' component={Account} />
            </div>
        </BrowserRouter>
    )
}