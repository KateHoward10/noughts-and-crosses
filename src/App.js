import React, { Component } from 'react';
import './App.css';
import Grid from './Grid';
import Board from './Board';

class App extends Component {
  state = {
	  connect4: true,
  }

  switch = () => {
  	let connect4 = this.state.connect4;
  	this.setState({
  		connect4: !connect4
  	})
  }

  render() {
    return (
      <div className="App">
        {this.state.connect4 ? <Board/> : <Grid/>}
        <button className="switch-button" onClick={this.switch}>{this.state.connect4 ? "Play Noughts & Crosses" : "Play Connect 4"}</button>
      </div>
    );
  }
}

export default App;
