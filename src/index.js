import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import { store, history } from './redux/config';

import App from './comps/App';
import Board from './comps/Board';
import Account from './comps/Account';

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <Route exact path="/" component={Board} />
                <Route path="/user" component={Account} />
            </div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
);