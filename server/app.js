const express = require('express');
const app = express();
const socketio = require('socket.io');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const quotable = require('./QuotableAPI');
dotenv.config();

const expressServer = app.listen(3001);
const io = socketio(expressServer);

const Game = require('./Models/Game');

mongoose.connect(process.env.MONGO_URI,
                {useNewUrlParser: true, useUnifiedTopology: true})
                .then(() => console.log('Connected to MongoDB'))
                .catch((err) => console.log(err));

quotable.randomQuote();

io.on('connect', (socket) => {
    socket.emit('test', 'this is from the server');
})
