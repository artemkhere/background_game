import socketIOClient from 'socket.io-client';
import {
  SOCKET_TRIGGER_CONNECT, SOCKET_CONNECT_ERROR, SOCKET_ERROR,
  SOCKET_TIMEOUT, SOCKET_CONNECT, SOCKET_DISCONNECT,
  SOCKET_TRIGGER_DISCONNECT
} from '../actions/actionTypes';

export default const createSocketMiddleware = (url) => {
  let socket;

  return storeAPI => next => action => {
    switch(action.type) {
      case SOCKET_TRIGGER_CONNECT: {
        socket = socketIOClient(url);

        socket.on('connect_error', (error) => {
          console.log(SOCKET_CONNECT_ERROR);
          storeAPI.dispatch({
            type: SOCKET_CONNECT_ERROR,
            payload: error
          });
        });

        socket.on('error', (error) => {
          console.log(SOCKET_ERROR);
          storeAPI.dispatch({
            type: SOCKET_ERROR,
            payload: error
          });
        });

        socket.on('connect_timeout', (timeout) => {
          console.log(SOCKET_TIMEOUT);
          storeAPI.dispatch({
            type: SOCKET_TIMEOUT,
            payload: timeout
          });
        });

        socket.on('connect', (data) => {
          // handle hydration of game state from this data
          console.log(SOCKET_CONNECT);
          storeAPI.dispatch({
            type: SOCKET_CONNECT,
            payload: data
          });
        });

        socket.on('disconnect', (timeout) => {
          console.log(SOCKET_DISCONNECT);
          storeAPI.dispatch({
            type: SOCKET_DISCONNECT,
            payload: timeout
          });
        });
      }
      case SOCKET_TRIGGER_DISCONNECT: {
        if (socket) { socket.disconnect(); }
      }
      // case "SEND_WEBSOCKET_MESSAGE": {
      //     socket.send(action.payload);
      //     return;
      //     break;
      // }
    }

    return next(action);
  }
}
