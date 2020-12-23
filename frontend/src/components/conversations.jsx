import React from 'react';
import { getDate } from '../utils/DateFormat';
import '../sass/components/_conversations.scss';

const Conversations = () => {
    return (
        <div className='conversations'>
            <div className='conversation p-3'>
                <div className='d-flex justify-content-between align-items-start mb-1'>
                    <h5 className='name'>Slay</h5>
                    <small className='date'>{getDate(new Date())}</small>
                </div>
                <small className='content'>Hello World</small>
            </div>
            <div className='conversation p-3'>
                <div className='d-flex justify-content-between align-items-start mb-1'>
                    <h5 className='name'>Justin</h5>
                    <small className='date'>{getDate(new Date())}</small>
                </div>
                <small className='content'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nunc facilisis arcu et ex luctus, non semper risus vehicula.
                </small>
            </div>
        </div>
    );
};

export default Conversations;
