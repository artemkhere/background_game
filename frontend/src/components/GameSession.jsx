import React from 'react';
import { connect } from 'react-redux';

import { connectToSocket, disconnectFromSocket } from '../actions/socketActions';
import ClickableArea from './ClickableArea';

function GameSession(props) {
  const { error, loading } = props.socket;
  const { connectToSocket, disconnectFromSocket, setCurrentScreen } = props;

  const handleQuit = () => {
    disconnectFromSocket();
    setCurrentScreen('LandingPage');
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
      <div>Clicks: {props.clicks}</div>
      <ClickableArea />
    </div>
  );

}

function mapStateToProps(state) {
  return {
    socket: state.socket,
    clicks: state.gameSession.clicks
  };
}

function mapDispatchToProps(dispatch) {
  return {
    connectToSocket: connectToSocket(dispatch),
    disconnectFromSocket: disconnectFromSocket(dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameSession);
