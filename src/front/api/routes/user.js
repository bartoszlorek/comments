import { POST } from '../constants';

const authMethod = (response) => {
    if (response) {
        if (response.status === 'success') {
            localStorage.setItem('token', response.data);
            return {
                auth: true
            }
        } else {
            localStorage.removeItem('token');
        }
    }
    return {
        auth: false
    }
}

export const logoutUser = () => {
    return {
        type: 'USER_LOGOUT'
    }
}

export default {
    signup: {
        url: '/signup',
        options: POST,
        transformer: authMethod,
        reducerName: 'user'
    },
    auth: {
        url: '/auth',
        options: POST,
        transformer: authMethod,
        reducerName: 'user'
    }
}