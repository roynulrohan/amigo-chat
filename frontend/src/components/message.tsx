import { useEffect, useState } from 'react';
import '../sass/components/_message.scss';

interface Props {
    name: string;
    content: string;
    date: Date;
    isMe: boolean;
    hideTitle: boolean;
}

const Message = ({ name, content, date, isMe, hideTitle }: Props) => {
    const [dateString, setDateString] = useState('');
    const dateFormat = require('dateformat');

    useEffect(() => {
        setDateString(dateFormat(date, 'shortTime'));
    }, []);

    return (
        <div className='message d-flex flex-column' title={dateFormat(date, 'shortTime') + ' - ' + dateFormat(date, 'longDate')}>
            {hideTitle ? (
                <> </>
            ) : (
                <div className='body'>
                    <small>
                        <span className={isMe ? 'name' : 'text-info'}>{name}</span>
                        <span className='date'>{' - ' + dateString}</span>
                    </small>
                </div>
            )}
            <h5 className='m-0 content'>{content}</h5>
        </div>
    );
};

export default Message;
