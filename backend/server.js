const express = require('express');
const app = require('express')();
const PORT = process.env.PORT || 4000;
const path = require('path');
const server = require('http').createServer(app);
const userRoute = require('./routes/userRoute');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const dotenv = require('dotenv');
dotenv.config();

const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost/',
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => {
    const id = socket.handshake.query.id;
    socket.join(id);

    console.log(id);

    socket.on('send-message', ({ recipient, message }) => {
        console.log('new message');
        console.log(recipient + ' - ' + message);
        socket.broadcast.to(recipient).emit('recieve-message', {
            sender: id,
            content: message,
        });
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

app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    next();
    console.log(__dirname);
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

server.listen(PORT, function () {
    console.log('Server is running on Port: ' + PORT);
});
