import React, { useState, useEffect } from 'react';
import Message from './message';
import '../sass/components/_chat.scss';
import { CSSTransition } from 'react-transition-group';
import { useSocket } from '../contexts/SocketProvider';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Chat = () => {
    const user = useSelector((state) => state.userReducer);
    const location = useLocation();
    const [recipient, setRecipient] = useState('');
    const [messages, setMessages] = useState([]);
    const [chatInput, setChatInput] = useState('');

    const socket = useSocket();

    useEffect(() => {
        if (user.currentUser && recipient) {
            axios({
                method: 'post',
                url: 'http://localhost:4000/message/',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: JSON.stringify({
                    Users: [user.currentUser.Username, recipient],
                }),
            }).then((res) => {
                if (res.data.success) {
                    console.log(res.data.result.Messages);
                    setMessages(res.data.result.Messages);
                }
            });
        }

        return () => {
            setMessages([]);
        };
    }, [user, recipient]);

    useEffect(() => {
        if (socket == null) return;

        if (socket) {
            socket.on('recieve-message', (message) => {
                setMessages((messages) => [
                    {
                        Username: message.sender,
                        Content: message.content,
                        DateCreated: message.date,
                    },
                    ...messages,
                ]);
            });
        }

        return () => socket && socket.off('recieve-message');
    }, [socket, messages]);

    useEffect(() => {
        if (location) {
            setRecipient(location.recipient);
        }
    }, [location]);

    const messageSend = (e) => {
        e.preventDefault();

        if (chatInput) {
            setMessages((messages) => [
                {
                    Username: user.currentUser.Username,
                    Content: chatInput,
                    DateCreated: new Date(),
                },
                ...messages,
            ]);

            socket.emit('send-message', {
                recipient: recipient,
                message: chatInput,
                date: Date.now(),
            });

            axios({
                method: 'post',
                url: 'http://localhost:4000/message/update',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: JSON.stringify({
                    Users: [user.currentUser.Username, recipient],
                    message: {
                        Username: user.currentUser.Username,
                        Content: chatInput,
                        DateCreated: Date.now(),
                    },
                }),
            });

            setChatInput('');
        }
    };

    return (
        <CSSTransition
            in={true}
            appear={true}
            timeout={600}
            classNames='fade'
            unmountOnExit
            key={recipient}>
            {recipient && user.currentUser ? (
                <div className='chat h-100'>
                    <div className='header d-flex justify-content-center align-items-center w-100 p-3'>
                        <h2 className='m-0'>
                            <span className='d-flex justify-content-center align-items-center badge rounded-pill bg-dark-accent'>
                                <span>{recipient}</span>
                                <span style={{ width: '2em' }}></span>
                                <span className='badge rounded-pill bg-success'>
                                    Online
                                </span>
                            </span>
                        </h2>
                    </div>
                    <div className='conversation d-flex flex-column-reverse px-4'>
                        {messages &&
                            messages.map((message, index) => {
                                let hideTitle = false;

                                if (messages[index + 1]) {
                                    if (
                                        message.Username ===
                                        messages[index + 1].Username
                                    ) {
                                        hideTitle = true;
                                    }
                                }
                                return (
                                    <Message
                                        key={message._id}
                                        name={message.Username}
                                        content={message.Content}
                                        date={message.DateCreated}
                                        isMe={
                                            user.currentUser.Username ===
                                            message.Username
                                        }
                                        hideTitle={hideTitle}
                                    />
                                );
                            })}
                    </div>
                    <div className='input d-flex justify-content-center align-items-center w-100 p-3'>
                        <form
                            className='input-group d-flex justify-content-center align-items-center rounded-pill bg-dark-accent w-100 h-100 px-4 mx-4'
                            onSubmit={messageSend}>
                            <input
                                type='text'
                                class='form-control'
                                placeholder='Enter your message'
                                aria-label='Message'
                                value={chatInput}
                                onChange={(ev) => {
                                    setChatInput(ev.target.value);
                                }}
                            />
                            <div class='input-group-append mx-2'>
                                <button type='submit' class='btn btn-info'>
                                    Send
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </CSSTransition>
    );
};

export default Chat;
