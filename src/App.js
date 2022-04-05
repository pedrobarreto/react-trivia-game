import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Config from './pages/Config';
import Ranking from './pages/Ranking';
import Feedback from './pages/Feedback';
import Game from './pages/Game';
import Login from './pages/Login';
import About from './pages/About';
import Header from './components/Header';

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/react-trivia-game" component={ Login } />
        <Route exact path="/game" component={ Game } />
        <Route exact path="/settings" component={ Config } />
        <Route exact path="/feedback" component={ Feedback } />
        <Route exact path="/ranking" component={ Ranking } />
        <Route exact path="/about" component={ About } />
      </Switch>
    </>
  );
}

export default App;
