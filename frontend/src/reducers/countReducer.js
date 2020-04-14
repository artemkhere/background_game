import initialState from './initialState';
import { ADD_TO_COUNT } from '../actions/actionTypes';

export default function count(state = initialState.count, action) {
  switch (action.type) {
    case ADD_TO_COUNT:
      console.log('ADD_TO_COUNT Action')
      console.log(state)
      // below will be usefull for upcoming tasks
      // return Object.assign({}, state, {
      //   count: state.count + 1
      // });
      return state + 1;
    default:
      return state;
  }
}
