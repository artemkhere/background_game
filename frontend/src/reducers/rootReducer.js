import { combineReducers } from 'redux';
import stuff from './stuffReducer';
import count from './countReducer';

const rootReducer = combineReducers({
  stuff,
  count
});

export default rootReducer;
