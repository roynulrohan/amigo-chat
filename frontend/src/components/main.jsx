import React, { useEffect } from 'react';
import Chat from '../components/chat';
import SideBar from '../components/sidebar';
import { useSocket } from '../contexts/SocketProvider';
import { useSelector, useDispatch } from 'react-redux';
import { setMessage, setOnlineUsers } from '../actions';
import { useHistory } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

const Main = () => {
    const user = useSelector((state) => state.userReducer);
    const messageReducer = useSelector((state) => state.messageReducer);
    const dispatch = useDispatch();
    const history = useHistory();
    const socket = useSocket();

    useEffect(() => {
        console.log(user);
        if (user.currentUser) {
            document.title = 'Amigo | Home';
        } else {
            document.title = 'Amigo | Welcome';
        }
    }, [user]);

    useEffect(() => {
        if (socket == null) return;

        socket.on('recieve-message', (message) => {
            dispatch(setMessage(message));
        });

        socket.on('online-users', (users) => {
            dispatch(setOnlineUsers(users));
        });

        return () => {
            socket && socket.off('recieve-message');
            socket && socket.off('online-users');
        };
    }, [socket, messageReducer]);

    return (
        <CSSTransition
            in={true}
            appear={true}
            timeout={400}
            classNames='fade'
            unmountOnExit>
            {user.currentUser !== undefined ? (
                user.currentUser ? (
                    <div>
                        <SideBar />
                        <Chat />
                    </div>
                ) : (
                    <></>
                )
            ) : (
                <div>
                    <div class='background'>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div className='main m-0 d-flex flex-column justify-content-center'>
                        <div className='text-center'>
                            <h1 className='app-font'>Welcome to</h1>
                            <h1 className='app-title'>Amigo</h1>
                            <h3 className='app-font mt-3 text-muted'>
                                Online Chat
                            </h3>
                            <h5 className='app-font my-4 text-muted'>
                                Login or Register to get started!
                            </h5>
                            <button
                                className='btn btn-info'
                                onClick={() => {
                                    history.push('/login');
                                }}>
                                Continue
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </CSSTransition>
    );
};

export default Main;
