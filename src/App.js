import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Menu from './components/Menu';
import Noughts from './components/Noughts';
import Connect4 from './components/Connect4';
import Battleships from './components/Battleships';

function App() {
  return (
    <div className="App">
      <Nav />
      <Switch>
        <Route exact path="/games-with-lines" component={Menu} />
        <Route exact path="/noughts&crosses" component={Noughts} />
        <Route exact path="/connect4" component={Connect4} />
        <Route exact path="/battleships" component={Battleships} />
      </Switch>
    </div>
  );
}

export default App;
