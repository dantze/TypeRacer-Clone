import {Routes, Route, BrowserRouter as Router} from 'react-router-dom';
import history from './history';
import GameMenu from './components/GameMenu';
import './index.css'

function App() {
  return (
      <Router history = {history}>
        <Routes>
          <Route path = '/' Component = {GameMenu} />
        </Routes>
        {/* <GameMenu /> */}
      </Router>
  );
}

export default App;
