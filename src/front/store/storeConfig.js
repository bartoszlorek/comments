import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const logger = createLogger();

export default function (preloadedState) {
    return createStore(
        reducers,
        preloadedState,
        applyMiddleware(
            thunk,
            logger
        )
    )
}