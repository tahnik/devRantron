import { combineReducers } from 'redux';
import Style from './styles';

const rootReducer = combineReducers({
	style: Style
});

export default rootReducer;
