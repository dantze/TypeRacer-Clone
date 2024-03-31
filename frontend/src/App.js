import {Routes, Route, BrowserRouter as Router} from 'react-router-dom';
import {useEffect} from 'react';
import history from './history';
import GameMenu from './components/GameMenu';
import './index.css'
import socket from './socketConfig'

function App() {
  useEffect(() =>{
    socket.on('test', msg => {
      console.log(msg)
    });
  }, [])
  return (
      <Router history = {history}>
        <Routes>
          <Route path = '/' Component = {GameMenu} />
        </Routes>
      </Router>
  );
}

export default App;
