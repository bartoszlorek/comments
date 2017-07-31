import { URL_API } from '../constants';

const authMethod = (data) => {
    if (data && data.status === 'success') {
        return {
            auth: true,
            token: data.data
        }
    }
    return {
        auth: false,
        token: ''
    }
}

export default {
    signup: {
        url: `${URL_API}/signup`,
        reducerName: 'user',
        transformer: authMethod,
        options: {
            method: 'POST'
        }
    },
    auth: {
        url: `${URL_API}/login`,
        reducerName: 'user',
        transformer: authMethod,
        options: {
            method: 'POST'
        }
    }
}