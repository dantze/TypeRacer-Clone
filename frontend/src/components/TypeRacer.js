import React from 'react';
import {Navigate} from 'react-router-dom';
import StartBtn from './StartBtn';
import CountDown from './CountDown';

import socket from '../socketConfig';

const findPlayer = players => {
    return players.find(player => player.socketID === socket.id);
}

const TypeRacer = ({gameState}) => {
    const {_id, players} = gameState;
    const player = findPlayer(players);
    if(_id === "")
        return <Navigate to = '/' />
    return (
        <div className = "w-full h-full text-center">
            <CountDown />
            <StartBtn player = {player} gameID = {_id}/>
        </div>
    )
}

export default TypeRacer;   