import { combineReducers } from 'redux';
import { sessionErrorsReducer } from './session_reducer';

export default combineReducers({
  session: sessionErrorsReducer,
});