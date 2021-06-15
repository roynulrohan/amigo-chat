import { useEffect, useState } from 'react';
import Chat from './chat';
import SideBar from './sidebar';
import { useSocket } from '../contexts/SocketProvider';
import { useSelector, useDispatch } from 'react-redux';
import { setMessage, setOnlineUsers } from '../actions';
import { useHistory } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { RootState } from '../types';

const Main = () => {
    const user = useSelector((state: RootState) => state.userReducer);
    const messageReducer = useSelector((state: RootState) => state.messageReducer);
    const dispatch = useDispatch();
    const history = useHistory();
    const socket: any = useSocket();
    const [windowWidth, setWindowWidth] = useState(1200);

    useEffect(
        () =>
            (window.onresize = () => {
                setWindowWidth(window.innerWidth);
            }),
        []
    );

    useEffect(() => {
        if (user.currentUser) {
            document.title = 'Amigo | Home';
        } else {
            document.title = 'Amigo | Welcome';
        }
    }, [user]);

    useEffect(() => {
        if (socket === null) return;

        socket?.on('recieve-message', (message: string) => {
            dispatch(setMessage(message));
        });

        socket?.on('online-users', (users: Object) => {
            dispatch(setOnlineUsers(users));
        });

        return () => {
            socket && socket?.off('recieve-message');
            socket && socket?.off('online-users');
        };
    }, [socket, messageReducer]);

    return (
        <CSSTransition in={true} appear={true} timeout={400} classNames='fade' unmountOnExit>
            {user.currentUser !== undefined ? (
                user.currentUser ? (
                    <div className='d-flex'>
                        <SideBar windowWidth={windowWidth} />
                        <Chat windowWidth={windowWidth} />
                    </div>
                ) : (
                    <></>
                )
            ) : (
                <div>
                    <div className='background'>
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
                            <h3 className='app-font mt-3 text-muted'>Online Chat</h3>
                            <h5 className='app-font my-4 text-muted'>Login or Register to get started!</h5>
                            <button
                                className='btn btn-info'
                                onClick={() => {
                                    history.push('/login');
                                }}
                            >
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
