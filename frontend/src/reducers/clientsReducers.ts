const defaultState = {
    currentClients: [],
};

interface Action {
    type: string;
    payload: Object;
}

function clientsReducer(state = defaultState, action: Action) {
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
