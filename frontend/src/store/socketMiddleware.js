import socketIOClient from 'socket.io-client';
import {
  SOCKET_TRIGGER_CONNECT, SOCKET_TRIGGER_DISCONNECT, SOCKET_EMIT
} from '../actions/actionTypes';
import {
  setSocketLoading, handleSocketConnect, setSocketError
} from '../actions/socketActions';

const createSocketMiddleware = (url) => {
  let socket;

  return storeAPI => next => action => {
    const dispatch = storeAPI.dispatch;

    switch(action.type) {
      case SOCKET_TRIGGER_CONNECT:
        setSocketLoading(dispatch, true);

        socket = socketIOClient(url);

        socket.on('connect', (data) => {
          handleSocketConnect(dispatch, data);
        });

        socket.on('connect_error', (error) => {
          setSocketError(dispatch, error);
        });

        socket.on('error', (error) => {
          setSocketError(dispatch, error);
        });

        socket.on('connect_timeout', (timeout) => {
          setSocketError(dispatch, timeout);
        });

        socket.on('disconnect', (reason) => {
          // reason is a String
          // ‘io server disconnect’, ‘io client disconnect’, or ‘ping timeout’
          setSocketError(dispatch, { message: reason });
        });

        // socket.on('updateGameSession', (data) => {
        //   // reason is a String
        //   // ‘io server disconnect’, ‘io client disconnect’, or ‘ping timeout’
        //   setSocketError(dispatch, { message: reason });
        // });
        break;
      case SOCKET_TRIGGER_DISCONNECT:
        if (socket) { socket.disconnect(); }
        return;
      case SOCKET_EMIT:
        const { eventName } = action.payload;
        const data = action.payload.data || {};

        if (socket && socket.connected) {
          socket.emit(eventName, data);
        } else {
          setSocketError(dispatch, { message: 'Socket is not connected' });
        }
        return;
      default:
        break;
    }

    return next(action);
  }
}

export default createSocketMiddleware;
