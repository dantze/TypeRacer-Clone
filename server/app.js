const express = require('express');
const app = express();
const socketio = require('socket.io');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const quotable = require('./QuotableAPI');
dotenv.config();
const cors = require('cors');
app.use(cors());
const expressServer = app.listen(3001);
const io = require('socket.io')(5000, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

const Game = require('./Models/Game');

mongoose.connect(process.env.MONGO_URI,
                {useNewUrlParser: true, useUnifiedTopology: true})
                .then(() => console.log('Connected to MongoDB'))
                .catch((err) => console.log(err));


io.on('connect', (socket) => {

    socket.on('join-game', async ({gameID: _id, nickName}) => {
        try{
            let game = await Game.findById(_id);
            if(game.isOpen){
                const gameID = game._id.toString();
                socket.join(gameID);
                let player = {
                    socketID: socket.id,
                    isPartyLeader: false,
                    nickName
                }
                game.players.push(player);
                game = await game.save();   
                io.to(gameID).emit('updatGame', game);
            }
        }catch(err){
            console.log(err);
        }
    });

    socket.on('create-game', async (nickName) => {
        try{
            const quotableData = await quotable.randomQuote();
            let game = new Game();
            game.words = quotableData;
            let player = {
                socketID: socket.id,
                isPartyLeader: true,
                nickName
            }
            game.players.push(player);
            game = await game.save();

            const gameID = game._id.toString();
            socket.join(gameID);
            io.to(gameID).emit('updatGame', game);
        }catch(err){
            console.log(err);
        }
    })
})
