import React from 'react';
import { connect } from 'react-redux';

import {
  connectToSocket, disconnectFromSocket
} from '../actions/socketActions';
import ClickableArea from './ClickableArea';

function GameSession(props) {
  const { error, loading } = props.socket;
  const { connectToSocket, disconnectFromSocket } = props;

  if (error) {
    return (
      <div>
        <div>There was an error</div>
        <div onClick={connectToSocket}>Connect to Socket</div>
      </div>
    );
  };

  if (loading) { return <div>Loading...</div>; }

  return (
    <div style={{ textAlign: "center" }}>
      <div onClick={connectToSocket}>Connect to Socket</div>
      <div onClick={disconnectFromSocket}>Disconnect From Socket</div>
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
