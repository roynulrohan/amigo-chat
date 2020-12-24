const defaultState = {
    currentUser: '',
};

function userReducer(state = defaultState, action) {
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
