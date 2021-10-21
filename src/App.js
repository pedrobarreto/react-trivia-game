import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Config from './pages/Config';
import Login from './pages/Login';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/config" component={ Config } />
    </Switch>
  );
}

export default App;
