import { combineReducers } from 'redux';
import rest from './rest';

const reducers = combineReducers(
    rest.reducers
);

export default reducers;