import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Menu from './components/Menu';
import Grid from './components/Grid';
import Board from './components/Board';
import Sea from './components/Sea';

function App() {
  return (
    <div className="App">
      <Nav />
      <Switch>
        <Route exact path="/" component={Menu} />
        <Route exact path="/noughts&crosses" component={Grid} />
        <Route exact path="/connect4" component={Board} />
        <Route exact path="/battleships" component={Sea} />
      </Switch>
    </div>
  );
}

export default App;
