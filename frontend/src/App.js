import {Routes, Route, BrowserRouter as Router, useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import history from './history';
import GameMenu from './components/GameMenu';
import CreateGame from './components/CreateGame';
import './index.css'
import socket from './socketConfig'

function App() {
  //const navigate = useNavigate();
  const [gameState, setGameState] = useState({_id : "", isOpen : false, players: [], words: []});
  useEffect(() =>{
    socket.on('updatGame', game => {
      console.log(game);
      setGameState(game);
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
        </Routes>
      </Router>
  );
}

export default App;
