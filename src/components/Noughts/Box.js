import React from 'react';

const Box = ({ box, mySymbol, computerSymbol, selectBox }) => (
	<div className="box" onClick={selectBox}>
		{box.selectedBy === 'me' ? (
			<span className="mySymbol">{mySymbol}</span>
		) : box.selectedBy === 'computer' ? (
			<span className="computerSymbol">{computerSymbol}</span>
		) : null}
	</div>
);

export default Box;
