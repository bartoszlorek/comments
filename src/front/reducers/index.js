import { combineReducers } from 'redux';
import api from '../api';

const reducers = combineReducers(
    api.reducers
);

export default reducers;