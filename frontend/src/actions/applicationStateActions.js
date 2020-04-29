import {
  SET_CURRENT_SCREEN
} from './actionTypes';

export function setCurrentScreen(dispatch) {
  return (data) => {
    dispatch({
      type: SET_CURRENT_SCREEN,
      payload: data
    });
  }
}
