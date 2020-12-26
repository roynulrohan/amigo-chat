const defaultState = {
    currentClients: [],
};

function clientsReducer(state = defaultState, action) {
    switch (action.type) {
        case 'SET_ONLINE_USERS':
            return {
                ...state,
                currentClients: action.payload,
            };
        default:
            return state;
    }
}

export default clientsReducer;
