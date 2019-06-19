import React, { Component } from 'react';

class Cell extends Component {

  selectArrow = () => {
    if (!this.props.hidden && this.props.active) {
      this.props.selectColumn(parseFloat(this.props.index, 10), "me");
    }
  }

  render() {
    const hidden = this.props.hidden ? "none" : "block";
    return (
      <div className="arrow" onClick={this.selectArrow}><span style={{display: hidden}}>↓</span></div>
    );
  }
}

export default Cell;