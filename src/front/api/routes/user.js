import { URL } from '../constants';

export default {
    signup: {
        url: `${URL}/signup`,
        reducerName: 'user',
        options: {
            method: 'POST'
        }    
    }
}