import React from 'react';
import {Navigate} from 'react-router-dom';
import StartBtn from './StartBtn';
import CountDown from './CountDown';
import socket from '../socketConfig';
import DisplayWords from './DisplayWords';
import Form from './Form';

const findPlayer = players => {
    return players.find(player => player.socketID === socket.id);
}

const TypeRacer = ({gameState}) => {
    const {_id, players, words, isOpen, isOver} = gameState;
    console.log(words);
    const player = findPlayer(players);
    if(_id === "")
        return <Navigate to = '/' />
    return (
        <div className = "w-full h-full text-center">
            <DisplayWords words = {words} player = {player} />
            <Form isOpen = {isOpen} isOver = {isOver} gameID = {_id}/>
            <CountDown />
            {
                gameState.isOpen &&
                <StartBtn player = {player} gameID = {_id}/>
            }
            
        </div>
    )
}

export default TypeRacer;   