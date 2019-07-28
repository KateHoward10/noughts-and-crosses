import React, { Component } from 'react';
import './App.css';
import Grid from './Grid';
import Board from './Board';

class App extends Component {
  state = {
	  connect4: false,
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
        {this.state.connect4 ? <Board switchGame={this.switch} /> : <Grid switchGame={this.switch} />}
      </div>
    );
  }
}

export default App;
