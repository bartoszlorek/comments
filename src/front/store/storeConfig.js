import { createStore, applyMiddleware } from 'redux';
import { apiMiddleware } from '../utils/redux-creator.min';
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