import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Grid from './Grid';
import Board from './Board';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Grid} />
        <Route path="/connect4" component={Board} />
      </Switch>
    </div>
  );
}

export default App;
