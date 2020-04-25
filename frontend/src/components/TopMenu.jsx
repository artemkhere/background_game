import React from 'react';
import { connect } from 'react-redux';

import { connectToSocket, disconnectFromSocket } from '../actions/socketActions';
import { setCurrentScreen } from '../actions/applicationStateActions';

function TopMenu(props) {
  const { connectToSocket, disconnectFromSocket, setCurrentScreen } = props;

  const handlePlay = () => {
    setCurrentScreen('GameSession');
    connectToSocket();
  }

  const handleQuit = () => {
    disconnectFromSocket();
    setCurrentScreen('LandingPage');
  }

  return (
    <div style={{ textAlign: "right" }}>
      <button onClick={handlePlay}>Play</button>
      <button>Profile</button>
      <button onClick={handleQuit}>Logout</button>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    connectToSocket: connectToSocket(dispatch),
    disconnectFromSocket: disconnectFromSocket(dispatch),
    setCurrentScreen: setCurrentScreen(dispatch)
  };
}

export default connect(
  () => { return {}; },
  mapDispatchToProps
)(TopMenu);
