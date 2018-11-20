import React, { Component } from 'react';

class Box extends Component {

  select = () => {
    if (this.props.myTurn && this.props.selected==="") {
      this.props.selectBox(this.props.index, "me");
    }
  }

  render() {
    return (
      <div className="box" onClick={this.select}>
        {this.props.selected==="me" ? this.props.mySymbol : this.props.selected==="computer" ? this.props.computerSymbol : null}
      </div>
    );
  }
}

export default Box;
