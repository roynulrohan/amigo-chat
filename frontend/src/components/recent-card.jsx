import React, { useState, useEffect } from 'react';
import { getDate } from '../utils/DateFormat';
import { useHistory } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';
import defaultDP from '../assets/profile.png';
import { useSelector } from 'react-redux';

const RecentCard = ({ conversation }) => {
    const onlineUsersReducer = useSelector((state) => state.clientsReducer);
    const [photoURL, setphotoURL] = useState('');
    const history = useHistory();
    const [onlineStatus, setOnlineStatus] = useState(false);

    useEffect(() => {
        axios
            .get('/user/getPhoto?username=' + conversation.recipient)
            .then((res) => {
                if (res.data.success) {
                    setphotoURL(res.data.result);
                }
            });

        return () => {
            setphotoURL('');
        };
    }, []);
    
    useEffect(() => {
        if (onlineUsersReducer.currentClients) {
            setOnlineStatus(
                onlineUsersReducer.currentClients.includes(
                    conversation.recipient
                )
            );
        }

        return () => {
            setOnlineStatus(false);
        };
    }, [onlineUsersReducer, conversation.recipient]);

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
                        className={
                            'pfp ' +
                            (onlineStatus
                                ? 'ring-indicator-online'
                                : 'ring-indicator-offline')
                        }
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
