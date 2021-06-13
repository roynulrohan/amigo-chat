const defaultState = {
    currentMessage: '',
};

interface Action {
    type: string;
    payload: Object;
}

function messageReducer(state = defaultState, action: Action) {
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
