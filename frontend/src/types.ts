export interface RootState {
    userReducer: User;
    messageReducer: MessageReducer;
    clientsReducer: Clients;
    sidebarReducer: SidebarReducer;
}

export interface User {
    currentUser: CurrentUser;
}

export interface CurrentUser {
    Username: string;
    PhotoURL: string;
    Contacts: Array<string>;
}

export interface MessageReducer {
    currentMessage: CurrentMessage;
}

export interface CurrentMessage {
    sender: string;
    date: Date;
    content: string;
    isMe: boolean;
}

export interface Clients {
    currentClients: Array<Object>;
}

export interface SidebarReducer {
    isCollapsed: boolean;
}

export type LocationState = {
    recipient: string;
};
