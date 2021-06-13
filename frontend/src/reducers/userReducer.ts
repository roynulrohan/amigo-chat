const defaultState = {
    currentUser: '',
};

interface Action {
    type: string;
    payload: Object;
}

function userReducer(state = defaultState, action: Action) {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                currentUser: action.payload,
            };
        default:
            return state;
    }
}

export default userReducer;
