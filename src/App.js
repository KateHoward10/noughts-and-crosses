import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Grid from './components/Grid';
import Board from './components/Board';

function App() {
  return (
    <div className="App">
      <Nav />
      <Switch>
        <Route exact path="/" component={Grid} />
        <Route path="/connect4" component={Board} />
      </Switch>
    </div>
  );
}

export default App;
