const defaultState = {
    currentMessage: '',
};

function messageReducer(state = defaultState, action) {
    switch (action.type) {
        case 'SET_MESSAGE':
            return {
                ...state,
                currentMessage: action.payload,
            };
        default:
            return state;
    }
}

export default messageReducer;
