import React from 'react';
import { connect } from 'react-redux';

import { connectToSocket } from '../actions/socketActions';
import { setCurrentScreen } from '../actions/applicationStateActions';

function LandingPage(props) {
  const { connectToSocket, setCurrentScreen } = props;

  const handleStartNewGame = () => {
    setCurrentScreen('GameSession');
    connectToSocket();
  }

  return (
    <div style={{ textAlign: "center" }}>
      <button onClick={handleStartNewGame}>Start New Game</button>
      <button>Login</button>
    </div>
  );

}

function mapStateToProps(state) {
  return {
    socket: state.socket
  };
}

function mapDispatchToProps(dispatch) {
  return {
    connectToSocket: connectToSocket(dispatch),
    setCurrentScreen: setCurrentScreen(dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage);
