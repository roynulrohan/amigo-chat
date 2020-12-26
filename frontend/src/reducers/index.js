import { combineReducers } from 'redux';

import userReducer from './userReducer';
import messageReducer from './messageReducer';
import clientsReducer from './clientsReducers';

const root = combineReducers({ userReducer, messageReducer, clientsReducer });

export default root;
