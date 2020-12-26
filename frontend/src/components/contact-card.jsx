import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import defaultDP from '../assets/profile.png';
import { CSSTransition } from 'react-transition-group';

const ContactCard = ({ username, toDeleteCallback }) => {
    const history = useHistory();
    const [photoURL, setphotoURL] = useState('');

    useEffect(() => {
        axios
            .get('http://localhost:4000/user/getPhoto?username=' + username)
            .then((res) => {
                if (res.data.success) {
                    setphotoURL(res.data.result);
                }
            });
    }, []);

    return (
        <CSSTransition
            in={true}
            appear={true}
            timeout={400}
            classNames='fade'
            key={'contact-' + username}
            unmountOnExit>
            <div
                key={'contact-' + username}
                className='contact d-flex justify-content-between align-items-center p-3'>
                <div className='d-flex align-items-center ps-2'>
                    <div className='photo'>
                        <img
                            className='pfp'
                            src={photoURL ? photoURL : defaultDP}
                        />
                    </div>
                    <h5 className='name ps-3'>{username}</h5>
                </div>
                <div>
                    <a
                        title={'Message ' + username}
                        className='btn text-success'
                        onClick={() => {
                            history.push({
                                pathname: '/',
                                recipient: username.trim(),
                            });
                        }}>
                        <svg
                            id='Capa_1'
                            enable-background='new 0 0 465.882 465.882'
                            height='1.5em'
                            width='1.5em'
                            fill='currentColor'
                            viewBox='0 0 465.882 465.882'
                            xmlns='http://www.w3.org/2000/svg'>
                            <path d='m465.882 0-465.882 262.059 148.887 55.143 229.643-215.29-174.674 235.65.142.053-.174-.053v128.321l83.495-97.41 105.77 39.175z' />
                        </svg>
                    </a>
                    <a
                        className='btn text-danger text-center'
                        title='Delete'
                        onClick={() => {
                            toDeleteCallback(username);
                        }}>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='1.4em'
                            height='1.4em'
                            fill='currentColor'
                            class='bi bi-trash'
                            viewBox='0 0 16 16'>
                            <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z' />
                            <path
                                fill-rule='evenodd'
                                d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'
                            />
                        </svg>
                    </a>
                </div>
            </div>
        </CSSTransition>
    );
};

export default ContactCard;
