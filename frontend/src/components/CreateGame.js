import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import socket from '../socketConfig';

const CreateGame = props => {
    const navigate = useNavigate();
    const [nickName, setNickname] = useState('');
    const onChange = e => {
        setNickname(e.target.value);
    }
    const onSubmit = e => {
        e.preventDefault();
        socket.emit('create-game', nickName);
        navigate(`/game/${nickName}`);
    }
    return (
        <div className = "w-full h-full flex flex-col items-center justify-center mt-8">
            <text className = 'text-2xl pb-2'>
                Create Game
            </text>
        <form className = "flex flex-col" onSubmit = {onSubmit}>
            <text className = "">Enter Nick Name</text>
            <input type = "text" name = "nickName" className = "border-2" value = {nickName} onChange = {onChange} placeholder='enter..'></input>
            
            <button   className = "absolute mt-14 h-[40px] w-[130px] rounded-lg bg-blue-500"><text className = "p-4 text-white">Join Game</text></button>
        </form>
           
        </div>
    )
}

export default CreateGame;