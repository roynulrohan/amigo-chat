import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Nav, Tab } from 'react-bootstrap';
import Contacts from './contacts';
import Conversations from './conversations';
import Profile from './profile';
import { CSSTransition } from 'react-transition-group';
import { getFromStorage } from '../utils/storage';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../actions';
import axios from 'axios';
import '../sass/components/_sidebar.scss';

const SideBar = () => {
    const user = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    const history = useHistory();

    const logout = () => {
        const obj = getFromStorage('amigo-chat_roynulrohan');

        if (obj && obj.token) {
            const { token } = obj;

            axios
                .post('http://localhost:4000/user/logout?token=' + token)
                .then((res) => {
                    if (res.data.success) {
                        // remove user from redux store
                        dispatch(setUser());
                        history.push('/login');
                    }
                });
        }
    };

    return (
        <CSSTransition
            in={true}
            appear={true}
            timeout={400}
            classNames='fade'
            unmountOnExit>
            {user.currentUser ? (
                <div className='sidebar d-flex h-100 flex-column align-items-center'>
                    <div className='header bg-dark-accent unselectable w-100 p-3'>
                        <h2
                            className='app-title pointer mx-auto m-0'
                            onClick={() => {
                                history.push({
                                    pathname: '/',
                                    recipient: '',
                                });
                            }}>
                            Amigo
                        </h2>
                    </div>
                    <Tab.Container id='sidebar-options' defaultActiveKey='chat'>
                        <Nav
                            variant='pills'
                            className='nav w-100 justify-content-evenly'
                            fill
                            justify>
                            <Nav.Item id='chat' title='Chat'>
                                <Nav.Link eventKey='chat'>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='1.3em'
                                        height='1.3em'
                                        fill='currentColor'
                                        class='bi bi-chat-fill mb-1'
                                        viewBox='0 0 16 16'>
                                        <path d='M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z' />
                                    </svg>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item id='contacts' title='Contacts'>
                                <Nav.Link eventKey='contacts'>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='1.4em'
                                        height='1.4em'
                                        fill='currentColor'
                                        class='bi bi-person-circle mb-1'
                                        viewBox='0 0 16 16'>
                                        <path d='M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z' />
                                        <path
                                            fill-rule='evenodd'
                                            d='M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'
                                        />
                                        <path
                                            fill-rule='evenodd'
                                            d='M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z'
                                        />
                                    </svg>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item id='profile' title='Profile'>
                                <Nav.Link eventKey='profile'>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='1.4em'
                                        height='1.4em'
                                        fill='currentColor'
                                        class='bi bi-person-lines-fill mb-1'
                                        viewBox='0 0 16 16'>
                                        <path
                                            fill-rule='evenodd'
                                            d='M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7 1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm2 9a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z'
                                        />
                                    </svg>
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>

                        <Tab.Content className='w-100 h-100'>
                            <Tab.Pane eventKey='chat'>
                                <Conversations />
                            </Tab.Pane>
                            <Tab.Pane eventKey='contacts'>
                                <Contacts
                                    contactsData={
                                        user.currentUser &&
                                        user.currentUser.Contacts
                                    }
                                />
                            </Tab.Pane>
                            <Tab.Pane eventKey='profile'>
                                <Profile />
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                    <div className='footer w-100 d-flex flex-column align-items-center justify-content-center'>
                        <div className='d-flex justify-content-between align-items-center w-100 px-5'>
                            <h5 className='username app-font'>
                                {user.currentUser && user.currentUser.Username}
                            </h5>
                            <button
                                className='btn btn-danger'
                                onClick={() => logout()}>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </CSSTransition>
    );
};

export default SideBar;
