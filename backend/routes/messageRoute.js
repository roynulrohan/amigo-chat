const express = require('express');
const router = express.Router();
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');

router.route('/').post(function (req, res) {
    const { body } = req;
    const { Users } = body;

    if (Users.length === 1) {
        Conversation.find(
            { Users: { $regex: Users[0], $options: 'i' } },
            null,
            { sort: '-updatedAt' },

            (err, conversations) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Server error.',
                    });
                } else if (conversations.length === 0) {
                    return res.send({
                        success: false,
                        message: 'No conversations found.',
                    });
                } else {
                    let convoArr = [];

                    conversations.forEach((conversation) => {
                        const recipient = conversation.Users.filter(
                            (item) => item != Users[0]
                        )[0];

                        const recentMessage =
                            conversation.Messages[
                                conversation.Messages.length - 1
                            ];

                        const content = recentMessage && recentMessage.Content;
                        const date = recentMessage
                            ? recentMessage.DateCreated
                            : conversation.createdAt;

                        convoArr.push({
                            recipient: recipient,
                            content: content,
                            date: date,
                        });
                    });

                    return res.send({
                        success: true,
                        message: 'Conversation found.',
                        result: convoArr,
                    });
                }
            }
        );
    } else if (Users.length === 2) {
        Conversation.find(
            {
                $and: [
                    { Users: { $regex: Users[0], $options: 'i' } },
                    { Users: { $regex: Users[1], $options: 'i' } },
                ],
            },
            (err, conversations) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Server error.',
                    });
                } else if (conversations.length === 0) {
                    const newConversation = new Conversation({
                        Users: Users,
                    });

                    newConversation.save((err, doc) => {
                        if (err) {
                            return res.send({
                                success: false,
                                message: 'Error: server error',
                            });
                        }
                        return res.send({
                            success: true,
                            message: 'Conversation Created.',
                            result: doc,
                        });
                    });
                } else {
                    conversations[0].Messages.reverse();
                    return res.send({
                        success: true,
                        message: 'Conversation found.',
                        result: conversations[0],
                    });
                }
            }
        );
    }
});

router.route('/update').post(function (req, res) {
    const { body } = req;
    const { Users, message } = body;
    let params = {};

    if (message) {
        let newMessage = new Message({
            Username: message.Username,
            Content: message.Content,
            DateCreated: message.DateCreated,
        });
        params = { $push: { Messages: newMessage } };
    }

    Conversation.findOneAndUpdate(
        {
            $and: [
                { Users: { $regex: Users[0], $options: 'i' } },
                { Users: { $regex: Users[1], $options: 'i' } },
            ],
        },
        params,
        { new: true, upsert: true }
    ).exec(function (err, conversation) {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: server error',
            });
        } else {
            return res.send({
                success: true,
                message: 'Message Added.',
            });
        }
    });
});

module.exports = router;
