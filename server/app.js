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

    socket.on('userInput', async({userInput, gameID}) => {
        try{
            let game = await Game.findById(gameID);
            if(!game.isOpen && !game.isOver){
                let player = game.players.find(player => player.socketID === socket.id);
                let word = game.words[player.currentWordIndex];
                if(word === userInput){
                    player.currentWordIndex++;
                    if(player.currentWordIndex !== game.words.length){
                        game = await game.save();
                        io.to(gameID).emit('updateGame', game);
                        
                    }
                    else{
                        let endTime = new Date().getTime();
                        let {startTime} = game;
                        player.WPM = calculateWPM(endTime, startTime, player);
                        game = await game.save();
                        socket.emit('done');
                        io.to(gameID).emit('updateGame', game);
                    }
                }
            }
        }catch(err){
            console.log(err);
        }
    });

    socket.on('timer', async({gameID, playerID}) => {
        let countDown = 5;
        let game = await Game.findById(gameID);
        let player = game.players.id(playerID);
        if(player.isPartyLeader){
            let timerID = setInterval(async() => {
                if(countDown >= 0){
                    io.to(gameID).emit('timer', {countDown, msg: "Începe Jocul"});
                    countDown--;
                }
                else {
                    game.isOpen = false;
                    game = await game.save();
                    io.to(gameID).emit('updateGame', game);
                    startGameClock(gameID);
                    clearInterval(timerID);
                }
        }, 1000);
        }
    })

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
                io.to(gameID).emit('updateGame', game);
            }
        }catch(err){
            console.log(err);
        }
    });

    socket.on('create-game', async (nickName, callback) => {
        callback = typeof callback == "function" ? callback : () => {};
        try{
            
            const quotableData = await quotable.randomQuote();
            let game = new Game();
            quotableData.split(" ").forEach(word => game.words.push(word));
            //game.words.push(quotableData);
            let player = {
                socketID: socket.id,
                isPartyLeader: true,
                nickName
            }
            game.players.push(player);
            game = await game.save();
            console.log(game);
            const gameID = game._id.toString();

            callback({status: 'success', gameID});

            socket.join(gameID);
            io.to(gameID).emit('updateGame', game);
        }catch(err){
            console.log(err);
        }
    })
});

const startGameClock = async(gameID) => {
    let game = await Game.findById(gameID);
    game.startTime = new Date().getTime();
    game = await game.save();
    let time = 120;

    let timerID = setInterval(function gameIntervalFunc(){
        if(time >= 0){
            const formatTime = calculateTime(time);
            io.to(gameID).emit('timer', {countDown: formatTime, msg: "Timp Rămas"});
            time--;
        }
        else {
            (async() => {
                let endTime = new Date().getTime();
                let game = await Game.findById(gameID);
                let {startTime} = game;
                game.isOver = true;
                game.players.forEach((player, index) => {
                    if(player.WPM === -1)
                        game.players[index].WPM = calculateWPM(endTime, startTime, player);
                })
                game = await game.save();
                io.to(gameID).emit('updateGame', game);
                clearInterval(timerID);
            })();

        }
        return gameIntervalFunc;
    }(), 1000);
}

const calculateTime = time => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}


const calculateWPM = (endTime, startTime, player) => {  
    let numberOfWords = player.currentWordIndex;
    const timeInSeconds = (endTime - startTime) / 1000;
    const timeInMinutes = timeInSeconds / 60;
    const WPM = Math.floor(numberOfWords / timeInMinutes);
    return WPM;
}