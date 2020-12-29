import React, { useEffect, useState } from 'react';
import '../sass/components/_message.scss';

const Message = ({ name, content, date, isMe, hideTitle }) => {
    const [dateString, setDateString] = useState('');
    const dateFormat = require('dateformat');

    useEffect(() => {
        setDateString(dateFormat(date, 'shortTime'));
    }, []);

    return isMe ? (
        <div
            className='message d-flex flex-column align-items-end'
            title={
                dateFormat(date, 'shortTime') +
                ' - ' +
                dateFormat(date, 'longDate')
            }>
            {hideTitle ? (
                <> </>
            ) : (
                <small>
                    <span className='date'>{dateString + ' - '}</span>
                    <span className='text-info'>You</span>
                </small>
            )}
            <h5 className='m-0'>{content}</h5>
        </div>
    ) : (
        <div
            className='message d-flex flex-column'
            title={
                dateFormat(date, 'shortTime') +
                ' - ' +
                dateFormat(date, 'longDate')
            }>
            {hideTitle ? (
                <> </>
            ) : (
                <small>
                    <span className='name'>{name}</span>
                    <span className='date'>{' - ' + dateString}</span>
                </small>
            )}
            <h5 className='m-0'>{content}</h5>
        </div>
    );
};

export default Message;
