import React, { useState, useEffect } from 'react';
import { getDate } from '../utils/DateFormat';
import { useHistory } from 'react-router-dom';
import { useSocket } from '../contexts/SocketProvider';
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';
import '../sass/components/_conversations.scss';

const Conversations = () => {
    const user = useSelector((state) => state.userReducer);
    const messageReducer = useSelector((state) => state.messageReducer);
    const [conversations, setConversations] = useState([]);
    const history = useHistory();

    useEffect(() => {
        if (user.currentUser) {
            axios({
                method: 'post',
                url: 'http://localhost:4000/message/',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: JSON.stringify({
                    Users: [user.currentUser.Username],
                }),
            }).then((res) => {
                if (res.data.success) {
                    setConversations(res.data.result);
                }
            });
        }
    }, [user]);

    useEffect(() => {
        console.log(messageReducer.currentMessage);
        if (messageReducer.currentMessage) {
            if (conversations.length !== 0) {
                let search = conversations.find((conversation) => {
                    return (
                        conversation.recipient ===
                        messageReducer.currentMessage.sender
                    );
                });

                if (search) {
                    let pos = conversations
                        .map(function (e) {
                            return e.recipient;
                        })
                        .indexOf(search.recipient);

                    let copy = [...conversations];
                    let item = copy[pos];
                    item.content = messageReducer.currentMessage.content;
                    copy[pos] = item;

                    setConversations(copy);
                } else {
                    setConversations((conversations) => [
                        {
                            recipient: messageReducer.currentMessage.sender,
                            content: messageReducer.currentMessage.content,
                            date: messageReducer.currentMessage.date,
                        },
                        ...conversations,
                    ]);
                }
            } else {
                setConversations((conversations) => [
                    {
                        recipient: messageReducer.currentMessage.sender,
                        content: messageReducer.currentMessage.content,
                        date: messageReducer.currentMessage.date,
                    },
                    ...conversations,
                ]);
            }
        }
    }, [messageReducer]);

    return (
        <div className='conversations'>
            {conversations && conversations.length !== 0 ? (
                conversations.map((conversation) => {
                    return (
                        <CSSTransition
                            in={true}
                            appear={true}
                            timeout={400}
                            classNames='fade'
                            unmountOnExit>
                            <div
                                title={'Open Conversation'}
                                key={'conversation-' + conversation.recipient}
                                className='conversation p-3'
                                onClick={() => {
                                    history.push({
                                        pathname: '/',
                                        recipient: conversation.recipient.trim(),
                                    });
                                }}>
                                <div className='d-flex justify-content-between align-items-start mb-1'>
                                    <h5 className='name'>
                                        {conversation.recipient}
                                    </h5>
                                    <small className='date'>
                                        {getDate(new Date(conversation.date))}
                                    </small>
                                </div>
                                <small className='content'>
                                    {conversation.content}
                                </small>
                            </div>
                        </CSSTransition>
                    );
                })
            ) : (
                <div className='empty h-100 d-flex flex-column justify-content-center align-items-center'>
                    You have no conversations yet.
                </div>
            )}
        </div>
    );
};

export default Conversations;
