import { createStore, applyMiddleware } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import { createLogger } from 'redux-logger';
import reducers from '../reducers';

const logger = createLogger();

export default function (preloadedState) {
    return createStore(
        reducers,
        preloadedState,
        applyMiddleware(
            apiMiddleware,
            logger
        )
    )
}