import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import socket from '../socketConfig';

const JoinGame = props => {
    const navigate = useNavigate();
    const [userInput, setuserInput] = useState({gameID: "", nickName: ""});
    const onChange = e => {
        setuserInput({...userInput, [e.target.name]: e.target.value});
    }
    const onSubmit = e => {
        e.preventDefault();
        socket.emit('join-game', userInput);
        console.log(userInput); 
        navigate(`/game/${userInput.gameID}`);
    }
    return (
        <div className = "w-full h-full flex flex-col items-center justify-center mt-8">
            <text className = 'text-2xl pb-2'>
                Join Game
            </text>
        <form className = "flex flex-col pt-2" onSubmit = {onSubmit}>

            <text className = "pl-1 pb-1">Enter Game ID</text>
            <input 
            style={inputStyle}
            name = "gameID"
            type = "text"
            className = "pl-2 w-[400px] h-[38px] border-gray-600 border-[3px] rounded-xl p-[1px]"  
            onChange = {onChange}
            value = {userInput.gameID}
            placeholder='enter game id'></input>
            
            <text className = "pl-1 pb-1 mt-2">Enter Nick Name</text>
            <input 
            style={inputStyle}
            name='nickName'
            type = "text"
            className = "pl-2 w-[400px] h-[38px] border-gray-600 border-[3px] rounded-xl p-[1px]" 
            onChange = {onChange}
            value = {userInput.nickName} 
            placeholder='John Stone'></input>
            
            <button className = "absolute mt-40 h-[40px] w-[130px] rounded-lg bg-blue-500"><text className = "p-4 text-white">Join Game</text></button>
        </form>
           
        </div>
    )
}

const inputStyle = {
    outline: 'none',
}

export default JoinGame;