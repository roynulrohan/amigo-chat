import React, { useState, useEffect } from 'react';
import { getDate } from '../utils/DateFormat';
import { useHistory } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';
import defaultDP from '../assets/profile.png';

const RecentCard = ({ conversation }) => {
    const [photoURL, setphotoURL] = useState('');
    const history = useHistory();

    useEffect(() => {
        axios
            .get(
                'http://localhost:4000/user/getPhoto?username=' +
                    conversation.recipient
            )
            .then((res) => {
                if (res.data.success) {
                    setphotoURL(res.data.result);
                }
            });

        return () => {
            setphotoURL('');
        };
    }, []);

    return (
        <CSSTransition
            in={true}
            appear={true}
            timeout={400}
            classNames='fade'
            key={'conversation-' + conversation.recipient}
            unmountOnExit>
            <div
                title={'Open Conversation'}
                className='conversation d-flex p-3'
                onClick={() => {
                    history.push({
                        pathname: '/',
                        recipient: conversation.recipient.trim(),
                    });
                }}>
                <div className='photo'>
                    <img
                        className='pfp'
                        src={photoURL ? photoURL : defaultDP}
                    />
                </div>
                <div className='ms-3 mb-1 flex-grow-1'>
                    <div className='d-flex justify-content-between'>
                        <h5 className='name'>{conversation.recipient}</h5>
                        <small className='ms-auto me-0 date'>
                            {getDate(new Date(conversation.date))}
                        </small>
                    </div>
                    <small className='content'>{conversation.content}</small>
                </div>
            </div>
        </CSSTransition>
    );
};

export default RecentCard;
