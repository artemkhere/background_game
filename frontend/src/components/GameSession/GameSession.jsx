import React from 'react';
import { connect } from 'react-redux';

import {
  connectToSocket, disconnectFromSocket, socketEmit
} from '../../actions/socketActions';
import { setCurrentScreen } from '../../actions/applicationStateActions';
import ClickableArea from '../ClickableArea';
import ItemShop from './items/ItemShop';
import ItemInventory from './items/ItemInventory';
import ItemsEquipped from './items/ItemsEquipped';
import StructureShop from './structures/StructureShop';
import StructureSlots from './structures/StructureSlots';

function GameSession(props) {
  const { error, loading } = props.socket;
  const { resources, gameState } = props.gameSession;

  const {
    connectToSocket, disconnectFromSocket, setCurrentScreen,
    socketEmit
  } = props;

  console.log(error)

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
      <ItemInventory />
      <div>Resources: {resources}</div>
      <ClickableArea />
      <ItemsEquipped />
      <StructureShop />
      <StructureSlots />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    socket: state.socket,
    gameSession: state.gameSession
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
