export const setUser = (payload) => {
    return { type: 'SET_USER', payload };
};

export const setMessage = (payload) => {
    return { type: 'SET_MESSAGE', payload };
};

export const setOnlineUsers = (payload) => {
    return { type: 'SET_ONLINE_USERS', payload };
};
