import React, { useEffect } from 'react';
import '../sass/components/_message.scss';
import { getTime, getDate } from '../utils/DateFormat';

const Message = ({ name, content, date, isMe, hideTitle }) => {
    return isMe ? (
        <div
            className='message d-flex flex-column align-items-end'
            title={getTime(new Date(date))}>
            {hideTitle ? (
                <> </>
            ) : (
                <small>
                    <span className='date'>
                        {getTime(new Date(date)) + ' - '}
                    </span>
                    <span className='text-info'>You</span>
                </small>
            )}
            <h5 className='m-0'>{content}</h5>
        </div>
    ) : (
        <div
            className='message d-flex flex-column'
            title={getTime(new Date(date))}>
            {hideTitle ? (
                <> </>
            ) : (
                <small>
                    <span className='name'>{name}</span>
                    <span className='date'>
                        {' - ' + getTime(new Date(date))}
                    </span>
                </small>
            )}
            <h5 className='m-0'>{content}</h5>
        </div>
    );
};

export default Message;
