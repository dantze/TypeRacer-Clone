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
        socket.emit('create-game', nickName, (response) => {
            console.log(response);
            if(response.status === 'success') {
                navigate(`/game/${response.gameID}`);
            }
        
        });
        //navigate('/game/gameID');
    }
    return (
        <div className = "w-full h-full flex flex-col items-center justify-center mt-8">
            <text className = 'text-2xl pb-2'>
                Create Game
            </text>
        <form className = "flex flex-col pt-2" onSubmit = {onSubmit}>
            <text className = "pb-2">Enter Nick Name</text>
            <input style={inputStyle} type = "text" name = "nickName" className = "pl-2 w-[400px] h-[38px] border-gray-600 border-[3px] rounded-xl p-[1px]" value = {nickName} onChange = {onChange} placeholder='John Stone'></input>
            <button   className = "absolute mt-20 h-[40px] w-[130px] rounded-lg bg-blue-500"><text className = "p-4 text-white">Submit</text></button>
        </form>
           
        </div>
    )
}

const inputStyle = {
    outline: 'none',
}

export default CreateGame;