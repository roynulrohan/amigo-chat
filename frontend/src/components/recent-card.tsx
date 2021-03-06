import React, { useState, useEffect } from 'react';

import { useHistory, useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';
import defaultDP from '../assets/profile.png';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, LocationState } from '../types';
import { setSidebar } from '../actions';
interface Props {
    conversation: Conversation;
}

interface Conversation {
    recipient: string;
    content: Object;
    date: Date;
}

const RecentCard = ({ conversation }: Props) => {
    const onlineUsersReducer = useSelector((state: RootState) => state.clientsReducer);
    const [photoURL, setphotoURL] = useState('');

    const [onlineStatus, setOnlineStatus] = useState(false);
    const [timeString, setTimeString] = useState('');
    const [dateString, setDateString] = useState('');
    const history = useHistory();
    const location = useLocation<LocationState>();
    const dispatch = useDispatch();
    const dateFormat = require('dateformat');

    useEffect(() => {
        axios.get('/user/getPhoto?username=' + conversation.recipient).then((res) => {
            if (res.data.success) {
                setphotoURL(res.data.result);
            }
        });

        return () => {
            setphotoURL('');
        };
    }, [conversation.content]);

    useEffect(() => {
        setTimeString(dateFormat(conversation.date, 'shortTime'));
        setDateString(dateFormat(conversation.date, 'shortDate'));
    }, [conversation.date]);

    useEffect(() => {
        if (onlineUsersReducer.currentClients) {
            setOnlineStatus(onlineUsersReducer.currentClients.includes(conversation.recipient));
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
            unmountOnExit
        >
            <div
                title={'Open Conversation'}
                className='conversation d-flex p-3'
                onClick={() => {
                    dispatch(setSidebar());
                    if (location?.state?.recipient) {
                        if (location?.state?.recipient !== conversation.recipient.trim()) {
                            history.push({
                                pathname: '/',
                                state: { recipient: conversation.recipient.trim() },
                            });
                        }
                    } else {
                        history.push({
                            pathname: '/',
                            state: { recipient: conversation.recipient.trim() },
                        });
                    }
                }}
            >
                <div className='photo position-relative'>
                    <img className='pfp ' src={photoURL ? photoURL : defaultDP} />
                    <span className={onlineStatus ? 'indicator-online' : 'indicator-offline'}></span>
                </div>
                <div className='ms-3 mb-1 flex-grow-1'>
                    <div className='d-flex justify-content-between'>
                        <h5 className='name'>{conversation.recipient}</h5>

                        <small className='ms-auto me-0 date'>{timeString}</small>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <small className='content'>{conversation.content}</small>
                        <small className='ms-auto me-0 date'>{dateString}</small>
                    </div>
                </div>
            </div>
        </CSSTransition>
    );
};

export default RecentCard;
