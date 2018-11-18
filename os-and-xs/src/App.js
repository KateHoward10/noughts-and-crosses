import React, { Component } from 'react';
import './App.css';
import GridContainer from './GridContainer';

class App extends Component {

  render() {
    return (
      <div className="App">
        <h2>Noughts and Crosses</h2>
        <GridContainer/>
      </div>
    );
  }
}

export default App;
