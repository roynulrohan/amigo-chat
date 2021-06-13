import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import '../sass/components/_conversations.scss';
import RecentCard from './recent-card';
import { RootState } from '../types';

interface Conversation {
    recipient: string;
    content: Object;
    date: Date;
}

const Conversations = () => {
    const user = useSelector((state: RootState) => state.userReducer);
    const messageReducer = useSelector((state: RootState) => state.messageReducer);
    const [conversations, setConversations] = useState<Array<Conversation>>([]);

    useEffect(() => {
        return () => {
            setConversations([]);
        };
    }, []);

    useEffect(() => {
        if (user.currentUser) {
            axios({
                method: 'post',
                url: '/message/',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: JSON.stringify({
                    Users: [user.currentUser.Username],
                }),
            }).then((res) => {
                if (res.data.success) {
                    setConversations(res.data.result);
                }
            });
        }
    }, [user]);

    useEffect(() => {
        if (messageReducer.currentMessage) {
            if (conversations.length !== 0) {
                const search = conversations.find((conversation: Conversation) => {
                    return conversation.recipient === messageReducer.currentMessage.sender;
                });

                if (search) {
                    let pos = conversations
                        .map((conversation: Conversation) => {
                            return conversation.recipient;
                        })
                        .indexOf(search.recipient);

                    let copy: any = [...conversations];
                    let item: any = copy[pos];
                    item.content = messageReducer.currentMessage.content;
                    item.date = messageReducer.currentMessage.date;
                    copy[pos] = item;
                    setConversations(copy);
                } else {
                    setConversations((conversations) => [
                        {
                            recipient: messageReducer.currentMessage.sender,
                            content: messageReducer.currentMessage.content,
                            date: messageReducer.currentMessage.date,
                        },
                        ...conversations,
                    ]);
                }
            } else {
                setConversations((conversations) => [
                    {
                        recipient: messageReducer.currentMessage.sender,
                        content: messageReducer.currentMessage.content,
                        date: messageReducer.currentMessage.date,
                    },
                    ...conversations,
                ]);
            }
        }
    }, [messageReducer]);

    return (
        <div className='conversations'>
            {conversations && conversations.length !== 0 ? (
                conversations.map((conversation) => {
                    return <RecentCard conversation={conversation} key={conversation.recipient} />;
                })
            ) : (
                <div className='empty text-center my-4'>You have no conversations yet.</div>
            )}
        </div>
    );
};

export default Conversations;
