import React from 'react';

const getScoreBoard = (players) => {
    const scoreBoard = players.filter(player => player.WPM !== -1)
    return scoreBoard.sort((a, b) => (a.WPM > b.WPM ? -1 : b.WPM > a.WPM ? 1 : 0));
}

const ScoreBoard = ({players}) => {
    const scoreBoard = getScoreBoard(players);
    if(scoreBoard.lenght === 0)
        return null;
    return (
        <table className = "min-w-full divide-y divide-gray-200 bg-white shadow-md my-3">
            <thead>
                <tr>
                    <th scope = "col">#</th>
                    <th scope = "col">User</th>
                    <th scope = "col">WPM</th>
                </tr>
            </thead>
            <tbody>
                {
                    scoreBoard.map((player, index) => {
                        return <tr>
                            <th scope = "row">{index + 1}</th>
                            <td>{player.nickName}</td>
                            <td>{player.WPM}</td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    )
}
 
export default ScoreBoard;