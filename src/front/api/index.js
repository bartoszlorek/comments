import reduxApi from 'redux-api';
import adapterFetch from 'redux-api/lib/adapters/fetch';

import comments from './routes/comments';
import user from './routes/user';

const routes = Object.assign({},
    comments,
    user
);

const api = reduxApi(routes);
api.use('fetch', adapterFetch(fetch));
api.use('options', (url, params, getState) => {
    const { user: { data: { token } } } = getState();
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    if (token !== '') {
        headers.Authorization = 'Bearer ' + token;
    }
    return { headers }
});

export default api;