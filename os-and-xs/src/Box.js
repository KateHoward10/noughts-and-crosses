import React, { Component } from 'react';

class Box extends Component {

  componentDidUpdate(prevProps) {
    if (this.props.selectedBy!==prevProps.selectedBy) {
      this.props.checkForThree("me");
      this.props.checkForThree("computer");
    }
  }

  render() {
    return (
      <div className="box" onClick={() => this.props.select(this.props.index, "me")}>
        {this.props.box.selectedBy}
        {this.props.selectedBy==="me" ? <span>{this.props.mySymbol}</span> : this.props.selectedBy==="computer" ? <span className="symbol">{this.props.computerSymbol}</span> : null}
      </div>
    );
  }
}

export default Box;
