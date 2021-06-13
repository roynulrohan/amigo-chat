import React, { useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = React.createContext(null);

export function useSocket() {
    return useContext(SocketContext);
}

interface Params {
    id: string;
    children: Object;
}

export function SocketProvider({ id, children }: Params) {
    const [socket, setSocket] = useState<any>();

    useEffect(() => {
        const newSocket = io({
            query: { id },
            timeout: 10001,
            transports: ['websocket'],
        });

        setSocket(newSocket);

        return () => {
            newSocket.close();
        };
    }, [id]);

    return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
}
