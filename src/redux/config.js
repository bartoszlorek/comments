import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import reducers from './reducers';

import createHistory from 'history/createBrowserHistory';
import { routerReducer, routerMiddleware } from 'react-router-redux';

const logger = createLogger();
const history = createHistory();
const router = routerMiddleware(history);

const store = createStore(
    combineReducers({
        data: reducers,
        router: routerReducer
    }),
    applyMiddleware(
        router,
        logger
    )
);

export {
    store,
    history
}