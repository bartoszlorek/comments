import { CALL_API } from 'redux-api-middleware';
import { defaults, clone, isPlainObject } from 'lodash';
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

                apiActions[reducerName][actionName] = (params, body) => ({
                    [CALL_API]: addData(normalized, params, body)
                });

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

function allowBody(action, body) {
    return action.method !== 'GET'
        && action.method !== 'HEAD'
        && isPlainObject(body);
}

function assign(target, source) {
    return target ? target : Object.assign({}, source);
}

function addData(action, params, query) {
    const withParams = addParams(action.endpoint, params);
    let copy = null;

    if (action.endpoint !== withParams) {
        copy = assign(copy, action);
        copy.endpoint = withParams;
    }
    if (allowBody(action, query)) {
        copy = assign(copy, action);
        copy.body = toBody(query);
    }
    return copy ? copy : action;
}

function addParams(url, params) {
    const keys = params && Object.keys(params);

    if (!keys || keys.length === 0) {
        return url;
    }
    return keys.reduce((url, key) => {
        const regex = new RegExp(`:${key}`, 'g');
        return url.replace(regex, params[key]);
    }, url);
}