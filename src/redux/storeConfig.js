import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './reducer';

const logger = createLogger();

export default function (preloadedState) {
    return createStore(
        reducer,
        preloadedState,
        applyMiddleware(
            thunk,
            logger
        )
    )
}