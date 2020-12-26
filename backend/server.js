const express = require('express');
const app = require('express')();
const dotenv = require('dotenv');
const PORT = process.env.PORT || 4000;
const path = require('path');
const server = require('http').createServer(app);
const userRoute = require('./routes/userRoute');
const messageRoute = require('./routes/messageRoute');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

dotenv.config();

const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost/',
        methods: ['GET', 'POST'],
    },
});

let allClients = [];

io.on('connection', (socket) => {
    const id = socket.handshake.query.id;
    socket.join(id);

    allClients.push(id);
    io.emit('online-users', allClients);

    socket.on('send-message', ({ recipient, message, date }) => {
        socket.broadcast.to(recipient).emit('recieve-message', {
            sender: id,
            content: message,
            date: date,
        });
    });

    socket.on('disconnect', function () {
        let i = allClients.indexOf(socket.handshake.query.id);

        allClients.splice(i, 1);
        io.emit('online-users', allClients);
    });
});

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once('open', function () {
    console.log('MongoDB database connection established successfully');
});

app.use(cors());
app.use(bodyParser.json());

app.use('/user', userRoute);
app.use('/message', messageRoute);

app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', (req, res) => {
    console.log(__dirname);
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

server.listen(PORT, function () {
    console.log('Server is running on Port: ' + PORT);
});
