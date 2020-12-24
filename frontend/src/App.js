import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom';
import './sass/App.scss';
import Chat from './components/chat';
import SideBar from './components/sidebar';
import Login from './components/login';
import { SocketProvider } from './contexts/SocketProvider';
import { getFromStorage } from './utils/storage';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from './actions';
import axios from 'axios';

function App() {
    const user = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        // verifies current user
        const obj = getFromStorage('amigo-chat_roynulrohan');

        if (obj && obj.token) {
            const { token } = obj;

            axios
                .get('http://localhost:4000/user/verify?token=' + token)
                .then((res) => {
                    if (res.data.success) {
                        // write user to redux store
                        dispatch(setUser(res.data.user));
                    } else {
                        dispatch(setUser());
                    }
                });
        }
    }, []);

    return (
        <div>
            <Router>
                <Route path='/' exact>
                    <SocketProvider
                        id={user.currentUser && user.currentUser.Username}>
                        <SideBar />
                        <Chat />
                    </SocketProvider>
                </Route>
                <Route path='/login' component={Login} />
            </Router>
        </div>
    );
}

export default App;
