import { combineReducers } from 'redux';

import userReducer from './userReducer';
import messageReducer from './messageReducer';

const root = combineReducers({ userReducer, messageReducer });

export default root;
