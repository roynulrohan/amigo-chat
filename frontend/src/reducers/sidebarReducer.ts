const defaultState = {
    isCollapsed: false,
};

interface Action {
    type: string;
    payload: Object;
}

function sidebarReducer(state = defaultState, action: Action) {
    switch (action.type) {
        case 'SET_SIDEBAR':
            return {
                ...state,
                isCollapsed: action.payload,
            };
        default:
            return state;
    }
}

export default sidebarReducer;
