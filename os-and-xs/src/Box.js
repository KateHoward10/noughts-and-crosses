import React, { Component } from 'react';

class Box extends Component {

  select = () => {
    if (this.props.myTurn && this.props.selected==="") {
      this.props.selectBox(this.props.index, "me");
    }
    this.props.finishTurn();
  }

  render() {
    return (
      <div className="box" onClick={this.select}>
        {this.props.selected==="me" ? <span>{this.props.mySymbol}</span> : this.props.selected==="computer" ? <span className="symbol">{this.props.computerSymbol}</span> : null}
      </div>
    );
  }
}

export default Box;
