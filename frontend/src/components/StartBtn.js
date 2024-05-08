import React, {useState} from 'react';
import socket from '../socketConfig';


const StartBtn = ({player, gameID}) => {
    const [showBtn, setShowBtn] = useState(true);
    const {isPartyLeader} = player;

    const onClickHandler = e => {
        socket.emit('timer', {playerID: player._id, gameID});
        setShowBtn(false);
    }
    return (
        isPartyLeader && showBtn ?
        <div className = "w-full h-full text-center items-center pt-11">
            <button 
                type = "button"
                onClick = {onClickHandler} 
                className = "bg-blue-500 text-white p-2 rounded-lg">
                Start Joc
                </button>
        </div>
        : null
    )
}

export default StartBtn;