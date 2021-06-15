import { useEffect, useState } from 'react';
import '../sass/components/_message.scss';

interface Props {
    name: string;
    content: string;
    date: Date;
    isMe: boolean;
    hideTitle: boolean;
    photoURL?: any;
}

const Message = ({ name, content, date, isMe, hideTitle, photoURL }: Props) => {
    const [dateString, setDateString] = useState('');
    const dateFormat = require('dateformat');

    useEffect(() => {
        setDateString(dateFormat(date, 'shortTime'));
    }, []);

    return (
        <div
            className={'message d-flex align-items-center' + (hideTitle ? ' pt-0' : '')}
            title={dateFormat(date, 'shortTime') + ' - ' + dateFormat(date, 'longDate')}
        >
            {hideTitle ? (
                <> </>
            ) : (
                <div className='photo'>
                    <img className='pfp' src={photoURL} />
                </div>
            )}
            <div className='d-flex flex-column body'>
                {hideTitle ? (
                    <> </>
                ) : (
                    <small>
                        <span className={isMe ? 'name' : 'text-info'}>{name}</span>
                        <span className='date'>{' - ' + dateString}</span>
                    </small>
                )}
                <h5 className='m-0 content'>{content}</h5>
            </div>
        </div>
    );
};

export default Message;
