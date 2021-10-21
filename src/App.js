import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Config from './pages/Config';
import Game from './pages/Game';
import Login from './pages/Login';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/game" component={ Game } />
      <Route exact path="/config" component={ Config } />
    </Switch>
  );
}

export default App;
