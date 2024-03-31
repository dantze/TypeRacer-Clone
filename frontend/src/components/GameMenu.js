import {useNavigate} from 'react-router-dom';

export default function GameMenu() {
  let navigate = useNavigate();  
  return (
    <div className = "flex flex-col gap-x-4 w-full h-full items-center justify-centre mt-8">
        <h1 className = "text-2xl pb-2">Welcome to Joc De Tastat</h1>
        <div className = "flex flex-row gap-x-4">
            <button onClick = {() => navigate('/game/create')} className = "h-[40px] rounded-lg bg-blue-500"><text className = "p-4 text-white">Create Game</text></button>
            <button  onClick = {() => navigate('/game/join')} className = "h-[40px] rounded-lg bg-blue-500"><text className = "p-4 text-white">Join Game</text></button>
        </div>
        
    </div>
  );
}   