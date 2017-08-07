import reduxCreator, { noReturn, getJSON } from '../utils/redux-creator.min';

// import comments from './routes/comments';
// import user from './routes/user';

const options = {
    rootUrl: 'http://localhost:8080/api',
    headers: () => {
        const token = localStorage.getItem('token') || null;
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        if (token) {
            headers['Authorization'] = 'Bearer ' + token;
        }
        return headers;
    }
}

export default reduxCreator({
    comments: {
        initial: [],
        actions: {
            get: {
                method: 'GET',
                endpoint: '/comment',
                success: (action, state, res) => getJSON(res).then(json => json.data)
            },
            add: {
                method: 'POST',
                endpoint: '/comment',
                success: noReturn
            },
            logout: null
        }
    }
}, options);