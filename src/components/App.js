import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Menu from './Menu';
import Home from './Home';
import About from './About';

export default (props) => (
    <BrowserRouter>
        <div className='layout'>
            <Menu />
            <Route path='/' exact component={Home} />
            <Route path='/about' component={About} />
        </div>
    </BrowserRouter>
);