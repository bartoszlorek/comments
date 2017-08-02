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
api.use('rootUrl', 'http://localhost:8080/api');
api.use('options', (url, params, getState) => {
    const token = localStorage.getItem('token') || null;
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    if (token) {
        headers['Authorization'] = 'Bearer ' + token;
    }
    return { headers }
});

export default api;