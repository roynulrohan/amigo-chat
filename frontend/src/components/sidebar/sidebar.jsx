import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import './sidebar.scss';

const SideBar = () => {
    return (
        <div className='sidebar d-flex h-100 flex-column align-items-center'>
            <div className='bg-dark-accent w-100 text-center p-3'>
                <h2 className='title'>Amigo</h2>
            </div>
        </div>
    );
};

export default SideBar;
