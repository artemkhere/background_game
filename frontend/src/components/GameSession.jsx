import React from 'react';
import { connect } from 'react-redux';

import {
  connectToSocket, disconnectFromSocket, socketEmit
} from '../actions/socketActions';
import ClickableArea from './ClickableArea';

function GameSession(props) {
  const { error, loading } = props.socket;
  const { resources, gameState } = props.gameSession;
  const {
    connectToSocket, disconnectFromSocket, setCurrentScreen,
    socketEmit
  } = props;

  const handleQuit = () => {
    disconnectFromSocket();
    setCurrentScreen('LandingPage');
  }

  const handleBuyItem = () => {
    socketEmit({ eventName: 'buyItem', data: { itemName: 'New Item' } });
  }

  const displayItems = (items) => {
    return (
      <>
        {items.map((item) => { return <div>{item}</div>; })}
      </>
    );
  }

  if (error) {
    return (
      <div>
        <div>There was an error</div>
        <button onClick={connectToSocket}>Connect to Socket</button>
      </div>
    );
  };

  if (loading) { return <div>Loading...</div>; }

  return (
    <div style={{ textAlign: "center" }}>
      <button onClick={handleQuit}>Quit</button>
      <div>Items:</div>
      {displayItems(gameState.items)}
      <button onClick={handleBuyItem}>Buy Item</button>
      <div>Resources: {resources}</div>
      <ClickableArea />
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
    socketEmit: socketEmit(dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameSession);
