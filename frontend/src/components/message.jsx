import React, { useEffect } from 'react';
import '../sass/components/_message.scss';
import { getTime, getDate } from '../utils/DateFormat';

const Message = ({ name, content, isMe }) => {
    useEffect(() => {
        console.log(getTime(new Date()));
    }, []);

    return isMe ? (
        <div className='message d-flex flex-column align-items-end'>
            <small>
                <span className='date'>{getTime(new Date()) + ' - '}</span>
                <span className='text-info'>You</span>
            </small>
            <h4 className='m-0'>{content}</h4>
        </div>
    ) : (
        <div className='message d-flex flex-column'>
            <small>
                <span className='name'>{name}</span>
                <span className='date'>{' - ' + getDate(new Date())}</span>
            </small>
            <h4 className='m-0'>{content}</h4>
        </div>
    );
};

export default Message;
