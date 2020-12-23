import React from 'react';
import { Nav, Tab, Tabs } from 'react-bootstrap';
import Contacts from './contacts';
import Conversations from './conversations';
import Profile from './profile';
import '../sass/components/_sidebar.scss';

const SideBar = () => {
    return (
        <div className='sidebar d-flex h-100 flex-column align-items-center'>
            <div className='header bg-dark-accent unselectable w-100 p-3'>
                <h2 className='title mx-auto m-0'>Amigo</h2>
                <div className='notifications d-flex flex-column justify-content-center align-items-end'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='1.6em'
                        height='1.6em'
                        fill='currentColor'
                        class='bi bi-bell-fill'
                        viewBox='0 0 16 16'>
                        <path d='M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z' />
                    </svg>
                    <small className='notification-count'>2</small>
                </div>
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
                        <Contacts />
                    </Tab.Pane>
                    <Tab.Pane eventKey='profile'>
                        <Profile />
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
            <div className='footer w-100 d-flex flex-column align-items-center justify-content-center'>
                Footer
            </div>
        </div>
    );
};

export default SideBar;
