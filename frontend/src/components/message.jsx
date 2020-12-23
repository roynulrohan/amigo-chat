import React, { useEffect } from 'react';
import '../sass/components/_message.scss';
import { getTime, getDate } from '../utils/DateFormat';

const Message = ({ name, content, isMe, hideTitle }) => {
    useEffect(() => {
        console.log(getTime(new Date()));
    }, []);

    return isMe ? (
        <div className='message d-flex flex-column align-items-end'>
            {hideTitle ? (
                <> </>
            ) : (
                <small>
                    <span className='date'>{getTime(new Date()) + ' - '}</span>
                    <span className='text-info'>You</span>
                </small>
            )}
            <h5 className='m-0'>{content}</h5>
        </div>
    ) : (
        <div className='message d-flex flex-column'>
            {hideTitle ? (
                <> </>
            ) : (
                <small>
                    <span className='name'>{name}</span>
                    <span className='date'>{' - ' + getDate(new Date())}</span>
                </small>
            )}
            <h5 className='m-0'>{content}</h5>
        </div>
    );
};

export default Message;
