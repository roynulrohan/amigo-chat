import React from 'react';
import {  BrowserRouter as Router, Route } from 'react-router-dom';
import Chat from './chat';

const Main = () => {
    return (
        <div className='main'>
            <Router>
                <Route path='/' exact component={Chat} />
            </Router>
        </div>
    );
};

export default Main;
