import React, {useMemo, useState, useEffect} from 'react';
import {Navigate} from 'react-router-dom';
import StartBtn from './StartBtn';
import CountDown from './CountDown';
import socket from '../socketConfig';
import DisplayWords from './DisplayWords';
import Form from './Form';
import ProgressBar from './ProgressBar';
import ScoreBoard from './ScoreBoard';
import DisplayGameCode from './DisplayGameCode';

const findPlayer = players => {
    return players.find(player => player.socketID === socket.id);
}

const TypeRacer = ({gameState, shouldRenderCountDown}) => {
    const {_id, players, words, isOpen, isOver} = gameState;
    const [countDownRendered, setCountDownRendered] = useState(false);
    const [timer, setTimer] = useState({countDown: "", msg: ""});
    console.log(words);
    const player = findPlayer(players);
    
    useEffect(() => {
            socket.on('timer', async data => {
                console.log(data);
                await setTimer({countDown: data.countDown, msg: data.msg});
            })
            socket.on('done', () => {
                socket.removeListener('timer');
            })
        }, [timer.countDown])

    if(_id === "")
        {return <Navigate to = '/' />;}

    return (
        <div className = "w-full h-full text-center">
            <DisplayWords words = {words} player = {player} />
            <ProgressBar players = {players}  player = {player} wordsLength = {words.length} />
            <Form isOpen = {isOpen} isOver = {isOver} gameID = {_id}/>
            <CountDown countDown = {timer.countDown} msg = {timer.msg}/>
            
            {
                gameState.isOpen &&
                <StartBtn player = {player} gameID = {_id}/>
            }
            <DisplayGameCode gameID = {_id} />
            <ScoreBoard players = {players} />
            
        </div>
    )
}

export default TypeRacer;   