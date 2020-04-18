import React from 'react';
import { connect } from 'react-redux';

import { connectToSocket } from '../actions/socketActions';

function LandingPage(props) {
  const { connectToSocket } = props;

  return (
    <div style={{ textAlign: "center" }}>
      <button onClick={connectToSocket}>Start New Game</button>
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
    connectToSocket: connectToSocket(dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage);
