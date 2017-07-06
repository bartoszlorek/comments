import reduxApi from 'redux-api';
import adapterFetch from 'redux-api/lib/adapters/fetch';
import comments from './routes/comments';

const routes = Object.assign({},
    comments
);

const api = reduxApi(routes);
api.use('fetch', adapterFetch(fetch));
api.use('options', function () {
    return {
        headers: {
            'User-Agent': 'redux-api',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
});

export default api;