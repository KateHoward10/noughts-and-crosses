import React, { Component } from 'react';

class Box extends Component {

  render() {
    const { box, mySymbol, computerSymbol, selectBox } = this.props;
    return (
      <div className="box" onClick={selectBox}>
        {box.selectedBy==="me" ? <span>{mySymbol}</span> : box.selectedBy==="computer" ? <span className="symbol">{computerSymbol}</span> : null}
      </div>
    );
  }
}

export default Box;
