import {useNavigate} from 'react-router-dom';

export default function GameMenu() {
  let navigate = useNavigate();  
  return (
    <div className = "flex flex-col gap-x-4 w-full items-center justify-cente mt-8">
        <h1 className = "text-2xl">Welcome to Joc De Tastat</h1>
        <div className = "flex flex-row gap-x-4">
            <button onClick = {() => navigate('/game/create')} className = "text-text">Create Game</button>
            <button  onClick = {() => navigate('/game/join')} className = "">Join Game</button>
        </div>
        
    </div>
  );
}   