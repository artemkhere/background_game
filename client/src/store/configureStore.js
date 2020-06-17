import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from '../reducers/rootReducer';
import createSocketMiddleware from './socketMiddleware';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const socketMiddleware = createSocketMiddleware(process.env.REACT_APP_HOST_URL);

export default function configureStore() {
  return createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(socketMiddleware))
  );
}
