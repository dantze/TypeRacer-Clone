import {Routes, Route, BrowserRouter as Router, useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import history from './history';
import GameMenu from './components/GameMenu';
import CreateGame from './components/CreateGame';
import JoinGame from './components/JoinGame';
import './index.css'
import socket from './socketConfig'
import TypeRacer from './components/TypeRacer';

function App() {
  //const navigate = useNavigate();
  const [gameState, setGameState] = useState({_id : "", isOpen : false, players: [], words: []});
  useEffect(() =>{
    socket.on('updateGame', game => {
      console.log(game);
      setGameState(game);
      history.push(`/game/${game._id}`);
    })
    return () => {
      socket.removeAllListeners();
    }
    }, []);
  
  return (
      <Router history = {history}>
        <Routes>
          <Route path = '/' Component = {GameMenu} />
          <Route path = '/game/create' Component = {CreateGame} />
          <Route path = '/game/join' Component = {JoinGame} />
          <Route path = '/game/:gameID' Component = {props => 
              <TypeRacer
                {...props}
                gameState = {gameState}
              />
            }
          />
        </Routes>
      </Router>
  );
}

export default App;
