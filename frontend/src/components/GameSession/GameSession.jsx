import React from 'react';
import { connect } from 'react-redux';

import {
  connectToSocket, disconnectFromSocket, socketEmit
} from '../../actions/socketActions';
import { setCurrentScreen } from '../../actions/applicationStateActions';
import ClickableArea from '../ClickableArea';
import ItemShop from './ItemShop';

function GameSession(props) {
  const { error, loading } = props.socket;
  const { resources, gameState } = props.gameSession;

  const {
    connectToSocket, disconnectFromSocket, setCurrentScreen,
    socketEmit, gameSchema
  } = props;

  console.log(gameState)

  const displayInventory = (inventory) => {
    return (
      <>
        {inventory.map((item) => {
          return (
            <div>
              <div>Name: {item.name}</div>
              <div>Price: {item.price}</div>
              <div>Description: {item.description}</div>
            </div>
          );
        })}
      </>
    );
  }

  if (error) {
    return (
      <div>
        <div>There was an error</div>
        <button onClick={connectToSocket}>Reconnect</button>
      </div>
    );
  };

  if (loading) { return <div>Loading...</div>; }

  return (
    <div style={{ textAlign: "center" }}>
      <ItemShop />
      <div>Inventory:</div>
      {displayInventory(gameState.items.inventory)}
      <div>Resources: {resources}</div>
      <ClickableArea />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    socket: state.socket,
    gameSession: state.gameSession,
    gameSchema: state.gameSchema
  };
}

function mapDispatchToProps(dispatch) {
  return {
    connectToSocket: connectToSocket(dispatch),
    disconnectFromSocket: disconnectFromSocket(dispatch),
    socketEmit: socketEmit(dispatch),
    setCurrentScreen: setCurrentScreen(dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameSession);
