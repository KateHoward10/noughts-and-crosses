import React from 'react';

const Box = ({ box, mySymbol, computerSymbol, selectBox }) => (
	<div className="box" onClick={selectBox}>
		{box === 'me' ? (
			<span className="mySymbol">{mySymbol}</span>
		) : box === 'computer' ? (
			<span className="computerSymbol">{computerSymbol}</span>
		) : null}
	</div>
);

export default Box;
