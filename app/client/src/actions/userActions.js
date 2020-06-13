import {
  SET_USER_DATA, SET_USER_LOGGED_IN
} from './actionTypes';

export function setUserData(dispatch) {
  return (data) => {
    dispatch({
      type: SET_USER_DATA,
      payload: data
    });
  }
}

export function setUserLoggedIn(dispatch) {
  return (data) => {
    dispatch({
      type: SET_USER_LOGGED_IN,
      payload: data
    });
  }
}
