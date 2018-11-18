import { connect } from 'react-redux';
import Grid from './Grid';
import { swapTurn, selectBox } from './data/actions';

const mapStateToProps = state => {
	return {
		myTurn: state.get("myTurn"),
		boxes: state.get("boxes")
	};
};

const mapDispatchToProps = dispatch => {
	return {
		swapTurn: () => dispatch(swapTurn()),
		selectBox: (id, selected) => dispatch(selectBox(id, selected)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Grid);