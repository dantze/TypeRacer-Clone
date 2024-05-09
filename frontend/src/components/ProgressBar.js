import React from 'react';

const calculatePercentage = (player, wordsLength) => {
    if(player.currentWordIndex !== 0) {
        return ((player.currentWordIndex / wordsLength) * 100).toFixed(2) + "%";    
    }
    else
     return "0%";
}

const ProgressBar = ({player, players, wordsLength}) => {
    const percentage = calculatePercentage(player, wordsLength);
    return (
        <div>
            {
                <>
                    <div className = "flex flex-col justify-center items-center mt-3">
                        <h5 className = "text-left font-bold">{player.nickName}</h5>
                        <div className = "relative h-[25px] w-[65%] bg-gray-200 my-1 rounded-md" key = {player._id}>
                            <div className = "absolute top-0 left-0 h-full bg-blue-500"
                                role = "progressbar"
                                style = {{width : percentage}}>{percentage}</div>
                        </div>
                    </div>
                </>
            }
            {
                players.map(playerObj => {
                    const percentage = calculatePercentage(playerObj, wordsLength);
                    return playerObj._id !== player._id ?
                        <>
                            <div className = "flex flex-col justify-center items-center">
                                <h5 className = "text-left font-bold">{playerObj.nickName}</h5>
                                <div className = "relative h-[25px] w-[65%] bg-gray-200 my-1 rounded-md" key = {playerObj._id}>
                                    <div className = "absolute top-0 left-0 h-full bg-blue-500"
                                        role = "progressbar"
                                        style = {{width : percentage}}>{percentage}</div>
                                </div>
                            </div>
                        </> : null
                })
            }
        </div>
    )
}

export default ProgressBar;