import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './sass/App.scss';
import Login from './components/login';
import { SocketProvider } from './contexts/SocketProvider';
import { getFromStorage } from './utils/storage';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from './actions';
import axios from 'axios';
import Main from './components/main';

function App() {
    const user = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        // verifies current user
        const obj = getFromStorage('amigo-chat_roynulrohan');

        if (obj && obj.token) {
            const { token } = obj;

            axios
                .get('/user/verify?token=' + token)
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
        <Router>
            <Route path='/' exact>
                <SocketProvider
                    id={user.currentUser && user.currentUser.Username}>
                    <Main />
                </SocketProvider>
            </Route>
            <Route path='/login' component={Login} />
        </Router>
    );
}

export default App;
