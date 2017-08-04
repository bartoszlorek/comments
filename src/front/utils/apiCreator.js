import { CALL_API } from 'redux-api-middleware';
import { defaults } from 'lodash';
import toBody from './toBody';

export default function apiCreator(reducers, options) {
    const apiReducers = {};
    const apiActions = {};

    for (let reducerName in reducers) {
        const { initial, reducer, actions } = reducers[reducerName];
        const prefix = `@@api/${reducerName}/`;
        const localActions = {};
        const initialState = {
            data: initial ? initial : {},
            loading: false,
            error: null
        }

        apiReducers[reducerName] = {};
        apiActions[reducerName] = {};

        let currentReducer = reducer;
        if (typeof reducer === 'function') {
            currentReducer = reducer.bind(localActions);
        }

        for (let actionName in actions) {
            const action = actions[actionName];
            const actionPrefix = prefix + actionName;

            // middleware or local action
            if (action && action.endpoint) {
                const normalized = normalizeAction(
                    actionPrefix,
                    action,
                    options
                );

                apiActions[reducerName][actionName] = (data) => {
                    if (normalized.method !== 'GET' &&
                        normalized.method !== 'HEAD') {
                        normalized.body = toBody(data);
                    }
                    return {
                        [CALL_API]: normalized
                    }
                }

                currentReducer = createReducer(
                    initialState,
                    normalized.types,
                    currentReducer
                );

            } else {
                localActions[actionName] = actionPrefix;

                if (typeof action === 'function') {
                    apiActions[reducerName][actionName] = (data) => ({
                        type: actionPrefix,
                        payload: action(data)
                    });

                } else {
                    apiActions[reducerName][actionName] = (data) => ({
                        type: actionPrefix,
                        payload: data
                    });
                }
            }
        }
        apiReducers[reducerName] = currentReducer;
    }

    return {
        reducers: apiReducers,
        actions: apiActions
    }
}

function normalizeAction(prefix, action, options) {
    const _options = defaults(options, {
        headers: null,
        rootUrl: ''
    });

    const callbacks = [
        action.request,
        action.success,
        action.failure
    ];

    return {
        endpoint: _options.rootUrl + action.endpoint,
        types: ['/REQUEST', '/SUCCESS', '/FAILURE'].map((sufix, i) => {
            const type = prefix + sufix;
            const payload = callbacks[i];

            if (payload) {
                return {
                    type,
                    payload
                }
            }
            return type;
        }),
        headers: _options.headers,
        method: action.method
    }
}

function createReducer(initialState, types, next) {
    const typeNames = types.map(x => x.type ? x.type : x);
    const isNext = typeof next === 'function';

    return (state = initialState, action) => {
        switch (action.type) {
            case typeNames[0]:
                return {
                    ...state,
                    loading: true
                }
            case typeNames[1]:
                return {
                    ...state,
                    data: action.payload,
                    loading: false
                }
            case typeNames[2]:
                return {
                    ...state,
                    error: action.payload,
                    loading: false
                }
            default:
                return isNext
                    ? next(state, action)
                    : state;
        }
    }
}