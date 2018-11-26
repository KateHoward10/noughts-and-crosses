import React, { Component } from 'react';

class Box extends Component {

  selectBox = () => {
    if (this.props.box["selectedBy"] === "") {
      this.props.select(this.props.index, "me");
      this.props.finishTurn();      
    }
  }

  render() {
    const { selectedBy } = this.props.box;
    return (
      <div className="box" onClick={this.selectBox}>
        {selectedBy==="me" ? <span>{this.props.mySymbol}</span> : selectedBy==="computer" ? <span className="symbol">{this.props.computerSymbol}</span> : null}
      </div>
    );
  }
}

export default Box;
