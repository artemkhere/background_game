import * as types from './actionTypes';

export function addToCount(dispatch) {
  return () => { dispatch({ type: types.ADD_TO_COUNT }); };
}
