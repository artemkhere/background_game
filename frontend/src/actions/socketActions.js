import {
  SOCKET_TRIGGER_CONNECT, SOCKET_SET_ERROR, SOCKET_CONNECT,
  SOCKET_TRIGGER_DISCONNECT, SOCKET_SET_LOADING, SOCKET_EMIT
} from './actionTypes';

export function connectToSocket(dispatch) {
  return () => {
    dispatch({ type: SOCKET_TRIGGER_CONNECT });
  }
}

export function setSocketLoading(dispatch, loading) {
  dispatch({
    type: SOCKET_SET_LOADING,
    payload: loading
  });
}

export function handleSocketConnect(dispatch, data) {
  dispatch({
    type: SOCKET_CONNECT,
    payload: data
  });
}

export function setSocketError(dispatch, error) {
  dispatch({
    type: SOCKET_SET_ERROR,
    payload: error
  });
}

export function disconnectFromSocket(dispatch) {
  return () => {
    dispatch({ type: SOCKET_TRIGGER_DISCONNECT });
  }
}

export function socketEmit(dispatch) {
  return (event) => {
    dispatch({
      type: SOCKET_EMIT,
      payload: event
    });
  }
}
