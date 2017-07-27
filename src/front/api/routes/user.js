import { URL_API } from '../constants';

export default {
    signup: {
        url: `${URL_API}/signup`,
        reducerName: 'user',
        options: {
            method: 'POST'
        }
    },
    login: {
        url: `${URL_API}/login`,
        virtual: true,
        options: {
            method: 'POST'
        }
    }
}