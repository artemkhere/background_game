import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import socketIOClient from 'socket.io-client';
import rootReducer from '../reducers/rootReducer';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createGameSessionSocketMiddleware = (url) => {
    let socket;

    return storeAPI => next => action => {
        switch(action.type) {
            case "GAME_SESSION_SOCKET_CONNECT" : {
                socket = socketIOClient(url);

                // socket.on('connect_failed', () => {
                //   storeAPI.dispatch({ type : "FAILED_TO_CONNECT_TO_GAME_SESSION" });
                // });

                socket.on('connect_error', (error) => {
                  console.log('connect_error');
                  storeAPI.dispatch({
                    type : "GAME_SESSION_SOCKET_CONNECT_ERROR",
                    payload: error
                  });
                });

                socket.on('error', (error) => {
                  storeAPI.dispatch({
                    type : "GAME_SESSION_SOCKET_ERROR",
                    payload: error
                  });
                });

                socket.on('connect', () => {
                  console.log('connected to server');
                });

                socket.on('error', (error) => {
                  storeAPI.dispatch({
                    type : "GAME_SESSION_SOCKET_ERROR",
                    payload: error
                  });
                });

                socket.on('connect_timeout', (timeout) => {
                  console.log('connect_timeout');
                  storeAPI.dispatch({
                    type : "GAME_SESSION_SOCKET_TIMEOUT",
                    payload: timeout
                  });
                });

                socket.on('disconnect', () => {
                  console.log('Got disconnected!');
                });

                // socket.on("message", (message) => {
                //     storeAPI.dispatch({
                //         type : "SOCKET_MESSAGE_RECEIVED",
                //         payload : message
                //     });
                // });

                // will need to handle setting global state for returned Tower object with all info
                socket.on("FromAPI", (data) => {
                  console.log(data);
                });
                break;
            }
            case "SEND_WEBSOCKET_MESSAGE": {
                socket.send(action.payload);
                return;
            }
        }

        return next(action);
    }
}

const gameSessionSocketMiddleware = createGameSessionSocketMiddleware("http://127.0.0.1:6969");

export default function configureStore() {
  return createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(thunk, gameSessionSocketMiddleware))
  );
}
