import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';
import '../sass/components/_conversations.scss';
import RecentCard from './recent-card';

const Conversations = () => {
    const user = useSelector((state) => state.userReducer);
    const messageReducer = useSelector((state) => state.messageReducer);
    const [conversations, setConversations] = useState([]);
    const dateFormat = require('dateformat');

    useEffect(() => {
        return () => {
            setConversations([]);
        };
    }, []);

    useEffect(() => {
        if (user.currentUser) {
            axios({
                method: 'post',
                url: '/message/',
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
                    item.date = messageReducer.currentMessage.date;
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
                    return <RecentCard conversation={conversation} key={conversation.recipient} />;
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
