import React from 'react';
import { getDate } from '../utils/DateFormat';
import '../sass/components/_conversations.scss';

const Conversations = () => {
    return (
        <div className='conversations p-3'>
            <div className='conversation'>
                <div className='d-flex justify-content-between align-items-center mb-1'>
                    <h5 className='name'>Slay</h5>
                    <small>{getDate(new Date())}</small>
                </div>
                <small>Hello World</small>
            </div>
        </div>
    );
};

export default Conversations;
