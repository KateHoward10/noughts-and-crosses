
const swapTurn = (state, action) => state.update("myTurn", myTurn => !myTurn);
const selectBox = (state, {id, selected}) => state.update("boxes", boxes => (
	boxes.map((box, index) => index === id ? { index: index, selected: selected} : box)
));

const reducer = (state, action) => {
	switch (action.type) {
		case "swapTurn": return swapTurn(state, action);
		case "selectBox": return selectBox(state, action);
		default: return state;
	}
};

export default reducer;