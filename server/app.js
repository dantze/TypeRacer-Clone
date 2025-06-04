const express = require('express');
const app = express();
const socketio = require('socket.io');
const { createClient } = require('@supabase/supabase-js');
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

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

io.on('connect', (socket) => {
    socket.on('userInput', async({userInput, gameID}) => {
        try {
            const { data: game } = await supabase
                .from('games')
                .select('*, players(*)')
                .eq('id', gameID)
                .single();

            if (!game.is_open && !game.is_over) {
                const player = game.players.find(p => p.socket_id === socket.id);
                const word = game.words[player.current_word_index];

                if (word === userInput) {
                    const newWordIndex = player.current_word_index + 1;
                    
                    await supabase
                        .from('players')
                        .update({ current_word_index: newWordIndex })
                        .eq('id', player.id);

                    if (newWordIndex === game.words.length) {
                        const endTime = new Date().getTime();
                        const wpm = calculateWPM(endTime, game.start_time, player);
                        
                        await supabase
                            .from('players')
                            .update({ wpm })
                            .eq('id', player.id);

                        socket.emit('done');
                    }

                    const { data: updatedGame } = await supabase
                        .from('games')
                        .select('*, players(*)')
                        .eq('id', gameID)
                        .single();

                    io.to(gameID).emit('updateGame', updatedGame);
                }
            }
        } catch(err) {
            console.log(err);
        }
    });

    socket.on('timer', async({gameID, playerID}) => {
        let countDown = 5;
        const { data: game } = await supabase
            .from('games')
            .select('*, players(*)')
            .eq('id', gameID)
            .single();

        const player = game.players.find(p => p.id === playerID);

        if (player.is_party_leader) {
            let timerID = setInterval(async() => {
                if (countDown >= 0) {
                    io.to(gameID).emit('timer', {countDown, msg: "Începe Jocul"});
                    countDown--;
                } else {
                    await supabase
                        .from('games')
                        .update({ is_open: false })
                        .eq('id', gameID);

                    const { data: updatedGame } = await supabase
                        .from('games')
                        .select('*, players(*)')
                        .eq('id', gameID)
                        .single();

                    io.to(gameID).emit('updateGame', updatedGame);
                    startGameClock(gameID);
                    clearInterval(timerID);
                }
            }, 1000);
        }
    });

    socket.on('join-game', async ({gameID, nickName}) => {
        try {
            const { data: game } = await supabase
                .from('games')
                .select('*')
                .eq('id', gameID)
                .single();

            if (game.is_open) {
                socket.join(gameID);

                await supabase
                    .from('players')
                    .insert({
                        game_id: gameID,
                        socket_id: socket.id,
                        nickname: nickName,
                        is_party_leader: false
                    });

                const { data: updatedGame } = await supabase
                    .from('games')
                    .select('*, players(*)')
                    .eq('id', gameID)
                    .single();

                io.to(gameID).emit('updateGame', updatedGame);
            }
        } catch(err) {
            console.log(err);
        }
    });

    socket.on('create-game', async (nickName, callback) => {
        try {
            const quotableData = await quotable.randomQuote();
            const words = quotableData.split(" ");

            const { data: game } = await supabase
                .from('games')
                .insert({ words })
                .select()
                .single();

            await supabase
                .from('players')
                .insert({
                    game_id: game.id,
                    socket_id: socket.id,
                    nickname: nickName,
                    is_party_leader: true
                });

            const { data: fullGame } = await supabase
                .from('games')
                .select('*, players(*)')
                .eq('id', game.id)
                .single();

            callback({ status: 'success', gameID: game.id });

            socket.join(game.id);
            io.to(game.id).emit('updateGame', fullGame);
        } catch(err) {
            console.log(err);
        }
    });
});

const startGameClock = async(gameID) => {
    const startTime = new Date().getTime();
    
    await supabase
        .from('games')
        .update({ start_time: startTime })
        .eq('id', gameID);

    let time = 10000;

    let timerID = setInterval(function gameIntervalFunc() {
        if (time >= 0) {
            const formatTime = calculateTime(time);
            io.to(gameID).emit('timer', {countDown: formatTime, msg: "Timp Rămas"});
            time--;
        } else {
            (async() => {
                const endTime = new Date().getTime();
                
                const { data: game } = await supabase
                    .from('games')
                    .select('*, players(*)')
                    .eq('id', gameID)
                    .single();

                await supabase
                    .from('games')
                    .update({ is_over: true })
                    .eq('id', gameID);

                for (const player of game.players) {
                    if (player.wpm === -1) {
                        await supabase
                            .from('players')
                            .update({ 
                                wpm: calculateWPM(endTime, game.start_time, player)
                            })
                            .eq('id', player.id);
                    }
                }

                const { data: updatedGame } = await supabase
                    .from('games')
                    .select('*, players(*)')
                    .eq('id', gameID)
                    .single();

                io.to(gameID).emit('updateGame', updatedGame);
                clearInterval(timerID);
            })();
        }
        return gameIntervalFunc;
    }(), 1000);
};

const calculateTime = time => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
};

const calculateWPM = (endTime, startTime, player) => {  
    let numberOfWords = player.current_word_index;
    const timeInSeconds = (endTime - startTime) / 1000;
    const timeInMinutes = timeInSeconds / 60;
    const WPM = Math.floor(numberOfWords / timeInMinutes);
    return WPM;
};

app.listen(process.env.PORT || 3001, () => {
    console.log('Server running');
});