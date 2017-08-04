import { combineReducers } from 'redux';
import apiCreator from '../utils/apiCreator';

// import comments from './routes/comments';
// import user from './routes/user';

const dataJSON = res => res.json().then(json => json.data);

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

export default apiCreator({
    comments: {
        initial: [],
        actions: {
            get: {
                method: 'GET',
                endpoint: '/comment',
                success: (action, state, res) => dataJSON(res)
            },
            post: {
                method: 'POST',
                endpoint: '/comment'
            },
            log: null,
            out: data => data
        },
        reducer: function (state, action) {
            if (action.type === this.out) {
                //console.log(action)
            }
            return state;
        }
    }
}, options);