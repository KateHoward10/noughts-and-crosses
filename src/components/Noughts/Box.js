import React from 'react';

const Box = ({ box, mySymbol, computerSymbol, selectBox }) => (
	<div className="box" onClick={selectBox}>
		{box === 'me' ? (
			<span style={{color: mySymbol === 'X' ? 'red' : 'yellow'}}>{mySymbol}</span>
		) : box === 'computer' ? (
			<span className="computerSymbol" style={{color: computerSymbol === 'X' ? 'red' : 'yellow'}}>{computerSymbol}</span>
		) : null}
	</div>
);

export default Box;
