import React, { useState, useEffect } from 'react';
import { getDate } from '../utils/DateFormat';
import '../sass/components/_conversations.scss';
import { useSocket } from '../contexts/SocketProvider';

const Conversations = () => {
    const [conversations, setConversations] = useState();
    const socket = useSocket();

    useEffect(() => {
        if (socket) {
            socket.on('recieve-message', (message) => {
                console.log({ name: message.sender, message: message.content });

                setConversations([
                    { name: message.sender, message: message.content },
                    ...conversations,
                ]);
            });
        }

        return () => socket && socket.off('recieve-message');
    }, [socket]);

    return (
        <div className='conversations'>
            {conversations ? (
                conversations.map((conversation) => {
                    return (
                        <div className='conversation p-3'>
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
