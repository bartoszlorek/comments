import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import style from './style.css';

import Menu from './Menu/Menu';
import Board from './Board/Board';
import Account from './Account';

export default function (props) {
    return (
        <BrowserRouter>
            <div className={style.layout}>
                <Menu />
                <Route path='/' exact component={Board} />
                <Route path='/user' component={Account} />
            </div>
        </BrowserRouter>
    )
}