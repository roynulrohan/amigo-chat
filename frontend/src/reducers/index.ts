import { combineReducers } from 'redux';

import userReducer from './userReducer';
import messageReducer from './messageReducer';
import clientsReducer from './clientsReducers';
import sidebarReducer from './sidebarReducer';

const root = combineReducers({ userReducer, messageReducer, clientsReducer, sidebarReducer });

export default root;
