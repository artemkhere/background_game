import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from '../reducers/rootReducer';
import createSocketMiddleware from './socketMiddleware';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const socketMiddleware = createSocketMiddleware("http://127.0.0.1:6969");

export default function configureStore() {
  return createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(socketMiddleware))
  );
}
