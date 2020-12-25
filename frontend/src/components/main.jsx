import React, { useEffect, useState } from 'react';
import Chat from '../components/chat';
import SideBar from '../components/sidebar';
import { SocketProvider, useSocket } from '../contexts/SocketProvider';
import { useSelector, useDispatch } from 'react-redux';
import { setMessages } from '../actions';

const Main = () => {
    const user = useSelector((state) => state.userReducer);
    const messageReducer = useSelector((state) => state.messageReducer);
    const dispatch = useDispatch();
    const socket = useSocket();

    useEffect(() => {
        if (socket == null) return;

        socket.on('recieve-message', (message) => {
            dispatch(setMessages(message));
        });

        return () => socket && socket.off('recieve-message');
    }, [socket, messageReducer]);

    return (
        <div>
            <SideBar />
            <Chat />
        </div>
    );
};

export default Main;
