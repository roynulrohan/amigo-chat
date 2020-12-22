import React from 'react';
import './message.scss';

const Message = ({ name, content, isMe }) => {
    return isMe ? (
        <div className='message d-flex flex-column align-items-end'>
            <p className='text-info'>You</p>
            <h5 className='m-0'>{content}</h5>
        </div>
    ) : (
        <div className='message'>
            <p className='name'>{name}</p>
            <h5 className='m-0'>{content}</h5>
        </div>
    );
};

export default Message;
