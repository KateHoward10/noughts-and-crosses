import React, { Component } from 'react';
import Box from './Box';
import { possibleThrees } from './combinations';

class Grid extends Component {
  state = {
    win: "",
    boxes: [
      {index: 0, selectedBy: ""},
      {index: 1, selectedBy: ""},
      {index: 2, selectedBy: ""},
      {index: 3, selectedBy: ""},
      {index: 4, selectedBy: ""},
      {index: 5, selectedBy: ""},
      {index: 6, selectedBy: ""},
      {index: 7, selectedBy: ""},
      {index: 8, selectedBy: ""}
    ],
    winningThree: [],
    playing: false
  }

  reset = () => {
    this.setState({
      win: "",
      boxes: [
        {index: 0, selectedBy: ""},
        {index: 1, selectedBy: ""},
        {index: 2, selectedBy: ""},
        {index: 3, selectedBy: ""},
        {index: 4, selectedBy: ""},
        {index: 5, selectedBy: ""},
        {index: 6, selectedBy: ""},
        {index: 7, selectedBy: ""},
        {index: 8, selectedBy: ""}
      ],
      winningThree: [],
      myTurn: Boolean(Math.random() < 0.5),
      mySymbol: ["O", "X"][Math.round(Math.random())],
      playing: true
    }, () => {
      if (!this.state.myTurn) {
        this.finishTurn();
      }
    })
  }

  changeSymbol = () => {
    const { mySymbol } = this.state;
    this.setState({
      mySymbol: mySymbol==="X" ? "O" : "X",
    });
  }

  checkForThree = (player) => {
    const { boxes } = this.state;
    if (possibleThrees.some(combination => combination.every(boxNumber => boxes[boxNumber]["selectedBy"]===player))) {
      this.setState({
        win: player,
        winningThree: possibleThrees.find(combination => combination.every(boxNumber => boxes[boxNumber]["selectedBy"]===player)),
        playing: false
      });
    } else if (boxes.filter(box => box["selectedBy"]!=="").length > 8) {
      this.setState({ win: "draw", playing: false });
    };
  }

  select = (index, player) => {
    const { win, boxes, myTurn } = this.state;
    if (win !== "") {
      return;
    } else {
      boxes[index].selectedBy = player;
      this.setState({ boxes }, () => this.checkForThree(player));
      setTimeout(() => this.setState({ myTurn: !myTurn }), 500);
    }
  }

  selectBox = key => {
    const { win, boxes, myTurn, playing } = this.state;
    if (playing && myTurn && boxes[key]["selectedBy"]==="" && win==="") {
      this.select(key, "me");
      this.checkForThree("me");
      if (win!=="") {
        return;
      } else {
        this.finishTurn();
      }   
    }
  }

  finishTurn = () => {
    const { boxes } = this.state;
    const indices = Object.keys(boxes).filter(key => boxes[key]["selectedBy"]==="");
    let computerChoice;
    if (possibleThrees.some(combination =>
      combination.filter(boxNumber => boxes[boxNumber]["selectedBy"]==="computer").length===2
      && combination.filter(boxNumber => boxes[boxNumber]["selectedBy"]==="").length===1)
    ) {
      const combos = possibleThrees.filter(combination =>
        combination.filter(boxNumber => boxes[boxNumber]["selectedBy"]==="computer").length===2
        && combination.filter(boxNumber => boxes[boxNumber]["selectedBy"]==="").length===1);
      const randomCombo = combos[Math.floor(Math.random() * combos.length)];
      computerChoice = randomCombo.find(boxNumber => boxes[boxNumber]["selectedBy"]==="");
    } else if (possibleThrees.some(combination =>
      combination.filter(boxNumber => boxes[boxNumber]["selectedBy"]==="me").length===2
      && combination.filter(boxNumber => boxes[boxNumber]["selectedBy"]==="").length===1)
    ) {
      const combos = possibleThrees.filter(combination =>
        combination.filter(boxNumber => boxes[boxNumber]["selectedBy"]==="me").length===2
        && combination.filter(boxNumber => boxes[boxNumber]["selectedBy"]==="").length===1);
      const randomCombo = combos[Math.floor(Math.random() * combos.length)];
      computerChoice = randomCombo.find(boxNumber => boxes[boxNumber]["selectedBy"]==="");
    } else {
      computerChoice = indices[Math.floor(Math.random() * indices.length)];
    }
    setTimeout(this.select, 500, computerChoice, "computer");
  }

  render() {
    const { switchGame } = this.props;
    const { mySymbol, win, winningThree, boxes, myTurn, playing } = this.state;
    const computerSymbol = mySymbol==="X" ? "O" : "X";
    const boxSideLength = Math.min(window.innerWidth, window.innerHeight) / 4;
    return (
      <div className="console">
        <div className="game">
          <div className="container" style={{
            gridTemplateColumns: `repeat(3, ${boxSideLength}px)`,
            gridTemplateRows: `repeat(3, ${boxSideLength}px)` }}>
            {winningThree.length > 0 ? <svg className="path-container" width={boxSideLength * 3} height={boxSideLength * 3}>
              <line
                x1={((winningThree[0] % 3) * boxSideLength) + boxSideLength / 2}
                y1={(Math.floor(winningThree[0] / 3) * boxSideLength) + boxSideLength / 2}
                x2={((winningThree[2] % 3) * boxSideLength) + boxSideLength / 2}
                y2={(Math.floor(winningThree[2] / 3) * boxSideLength) + boxSideLength / 2}
              />
            </svg> : null}
            {Object.keys(boxes).map(key => <Box
              index={key}
              key={key}
              win={win}
              box={boxes[key]}
              mySymbol={mySymbol}
              computerSymbol={computerSymbol}
              selectBox={() => this.selectBox(key)}
            />)}
          </div>
        </div>
        <div className="controls">
          <button onClick={this.reset}>New Game</button>
          {playing && (
            <React.Fragment>
              <p>{myTurn ? "Your turn" : "The computer's turn"}</p>
              <div className="option-picker">
                <p>You are: {mySymbol}s</p>
                <button
                  onClick={this.changeSymbol}
                  style={{ backgroundColor: "yellow", color: "black" }}
                >
                  Choose {computerSymbol}s
                </button>
              </div>
            </React.Fragment>
          )}
          <button onClick={switchGame} className="secondary-button">Play Connect 4</button>
          {win==="draw" ? <h2>It's a draw</h2> : win==="me" ? <h2>You win!</h2> : win==="computer" ? <h2>The computer wins!</h2> : null}
        </div>
      </div>
    );
  }
}

export default Grid;
