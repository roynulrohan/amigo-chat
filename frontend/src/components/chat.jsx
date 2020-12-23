import React from 'react';
import Message from './message';
import '../sass/components/_chat.scss';

const Chat = () => {
    return (
        <div className='chat h-100 mx-1'>
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
                <Message name='Slay' content='Hello World' isMe={true} />
                <Message name='Slay' content='Hello World' />
            </div>
            <div className='input d-flex justify-content-center align-items-center w-100 p-3'>
                <div className='input-group d-flex justify-content-center align-items-center rounded-pill bg-dark-accent w-100 h-100 px-4 mx-4'>
                    <input
                        type='text'
                        class='form-control'
                        placeholder='Enter your message'
                        aria-label='Message'
                        aria-describedby='basic-addon2'
                    />
                    <div class='input-group-append mx-2'>
                        <button class='btn btn-info' type='button'>
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;
