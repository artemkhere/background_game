import {
  SET_USER_DATA
} from './actionTypes';

export function setUserData(dispatch) {
  return (data) => {
    dispatch({
      type: SET_USER_DATA,
      payload: data
    });
  }
}
