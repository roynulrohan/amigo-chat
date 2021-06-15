type Payload = any;

export const setUser = (payload?: Payload) => {
    return { type: 'SET_USER', payload };
};

export const setMessage = (payload?: Payload) => {
    return { type: 'SET_MESSAGE', payload };
};

export const setOnlineUsers = (payload?: Payload) => {
    return { type: 'SET_ONLINE_USERS', payload };
};

export const setSidebar = (payload?: Payload) => {
    return { type: 'SET_SIDEBAR', payload };
};
