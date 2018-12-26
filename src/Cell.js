import React, { Component } from 'react';

class Cell extends Component {
  selectCell = () => {
    const columnNumber = this.props.index % 7;
    this.props.selectColumn(columnNumber);
  }

  render() {
    const colour = this.props.fill==="me" ? "red" : this.props.fill==="computer" ? "yellow" : "white";
    return (
      <div className="cell">
        <div className="circle" onClick={this.selectCell} style={{backgroundColor: colour}}>{this.props.index}</div>
      </div>
    );
  }
}

export default Cell;