import React, { useState } from 'react';
import Message from './message';
import '../sass/components/_chat.scss';
import { CSSTransition } from 'react-transition-group';

const Chat = () => {
    const [messages, setMessages] = useState([
        { name: 'Slay', content: 'Hello User!', isMe: false },
        { name: 'User', content: 'Hello World!', isMe: true },
    ]);
    const [chatInput, setChatInput] = useState('');
    const [recipient, setRecipient] = useState('Slay');

    const messageSend = (e) => {
        e.preventDefault();
        if (chatInput) {
            setMessages([
                { name: 'User', content: chatInput, isMe: true },
                ...messages,
            ]);
        }

        setChatInput('');
    };

    return (
        <CSSTransition
            in={true}
            appear={true}
            timeout={600}
            classNames='fade'
            unmountOnExit>
            {recipient ? (
                <div className='chat h-100' key={recipient}>
                    <div className='header d-flex justify-content-center align-items-center w-100 p-3'>
                        <h2 className='m-0'>
                            <span className='d-flex justify-content-center align-items-center badge rounded-pill bg-dark-accent'>
                                <span>Slay</span>
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
                                    console.log(
                                        message.name ===
                                            messages[index + 1].name
                                    );
                                    if (
                                        message.name ===
                                        messages[index + 1].name
                                    ) {
                                        hideTitle = true;
                                    }
                                }
                                return (
                                    <Message
                                        name={message.name}
                                        content={message.content}
                                        isMe={message.isMe}
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
