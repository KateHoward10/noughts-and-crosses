import React, { Component } from 'react';

class Cell extends Component {
  state ={
    colour: 'white'
  }
  selectColumn = () => {
    if (this.props.index <= 6) {
      this.setState({ colour: 'red' })
    }
  }

  render() {
    return (
      <div className="cell">
        <div className="circle" onClick={this.selectColumn} style={{backgroundColor: this.state.colour}}>{this.props.index}</div>
      </div>
    );
  }
}

export default Cell;