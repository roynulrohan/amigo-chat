import { combineReducers } from 'redux';

import userReducer from './userReducer';

const root = combineReducers({ userReducer });

export default root;