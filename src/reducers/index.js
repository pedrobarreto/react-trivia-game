import { combineReducers } from 'redux';
import user from './user';
import settings from './settings';

const rootReducer = combineReducers({ user, settings });

export default rootReducer;
