import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSidebar } from '../actions';
import { RootState } from '../types';
import '../sass/components/_hamburger.scss';

interface Props {
    windowWidth: number;
}

export default function Hamburger({ windowWidth }: Props) {
    const collapsedState = useSelector((state: RootState) => state.sidebarReducer);
    const dispatch = useDispatch();

    const handleOnClick = () => {
        if (collapsedState.isCollapsed) {
            dispatch(setSidebar(false));
        } else {
            dispatch(setSidebar(true));
        }
    };

    return (
        <div
            className={'hamburger ' + (!(windowWidth < 1200) ? 'hidden' : '') + (collapsedState.isCollapsed ? ' clicked' : '')}
            onClick={handleOnClick}
        >
            <div className='wrapper'>
                <span />
                <span />
                <span />
                <span />
            </div>
        </div>
    );
}
