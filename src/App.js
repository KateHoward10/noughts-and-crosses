import React, { useState } from 'react';
import './App.css';
import Grid from './Grid';
import Board from './Board';

function App() {
  const [connect4, toggleConnect4] = useState(false);

  return (
    <div className="App">
      {connect4 ?
        <Board switchGame={() => toggleConnect4(false)} />
        :
        <Grid switchGame={() => toggleConnect4(true)} />
      }
    </div>
  );
}

export default App;
