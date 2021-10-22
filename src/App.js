import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Config from './pages/Config';
import Feedback from './pages/Feedback';
import Game from './pages/Game';
import Login from './pages/Login';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/game" component={ Game } />
      <Route exact path="/settings" component={ Config } />
      <Route exact path="/feedback" component={ Feedback } />
    </Switch>
  );
}

export default App;
