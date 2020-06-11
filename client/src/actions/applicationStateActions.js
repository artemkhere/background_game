import {
  SET_CURRENT_SCREEN, SET_APPLICATION_ERROR, SET_APPLICATION_LOADING
} from './actionTypes';

export function setCurrentScreen(dispatch) {
  return (data) => {
    dispatch({
      type: SET_CURRENT_SCREEN,
      payload: data
    });
  }
}

export function setApplicationError(dispatch) {
  return (data) => {
    dispatch({
      type: SET_APPLICATION_ERROR,
      payload: data
    });
  }
}

export function setApplicationLoading(dispatch) {
  return (data) => {
    dispatch({
      type: SET_APPLICATION_LOADING,
      payload: data
    });
  }
}
