import React, { useState, useEffect } from 'react';
import { getDate } from '../utils/DateFormat';
import { useHistory } from 'react-router-dom';
import { useSocket } from '../contexts/SocketProvider';
import '../sass/components/_conversations.scss';

const Conversations = () => {
    const [conversations, setConversations] = useState([]);
    const history = useHistory();
    const socket = useSocket();

    useEffect(() => {
        if (socket) {
            socket.on('recieve-message', (message) => {
                setConversations([
                    {
                        name: message.sender,
                        message: message.content,
                        date: message.date,
                    },
                    ...conversations,
                ]);
            });
        }

        console.log(socket);

        return () => socket && socket.off('recieve-message');
    }, [socket]);

    return (
        <div className='conversations'>
            {conversations.length !== 0 ? (
                conversations.map((conversation) => {
                    return (
                        <div
                            key={'conversation-' + conversation.name}
                            className='conversation p-3'
                            onClick={() => {
                                history.push({
                                    pathname: '/',
                                    recipient: conversation.name.trim(),
                                });
                            }}>
                            <div className='d-flex justify-content-between align-items-start mb-1'>
                                <h5 className='name'>{conversation.name}</h5>
                                <small className='date'>
                                    {getDate(new Date())}
                                </small>
                            </div>
                            <small className='content'>
                                {conversation.message}
                            </small>
                        </div>
                    );
                })
            ) : (
                <div className='empty h-100 d-flex flex-column justify-content-center align-items-center'>
                    You have no conversations yet
                </div>
            )}
        </div>
    );
};

export default Conversations;
