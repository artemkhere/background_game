import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import ClickableArea from './ClickableArea';

function GameSession(props) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [connectedToSocket, setConnectedToSocket] = useState(false);
  const [socket, setSocket] = useState(false);

  // this should not be a side effect -- it needs to be a button and
  // handle socket connection -- dedicate a component to it
  useEffect(() => {
    props.connectToGameSessionSocket();
  });

  // useEffect(() => {
  //   setLoading(true);
  //
  //   setSocket(socketIOClient("http://127.0.0.1:6969"));
  //
  //   if (socket) {
  //     socket.on('connect_failed', () => {
  //       setLoading(false);
  //       setError({ message: "Could not connect to server." });
  //     });
  //
  //     // will need to handle setting global state for returned Tower object with all info
  //     socket.on("FromAPI", (data) => {
  //       setLoading(false);
  //       console.log(data);
  //     });
  //
  //     // handle component unload
  //     return () => { socket.disconnect(); };
  //   } else {
  //     setLoading(false);
  //     setError({ message: "Could not connect to server." });
  //   }
  // });

  if (error) { return <div>{error.message}</div>; };
  if (loading) { return <div>Loading...</div>; }

  return (
    <div style={{ textAlign: "center" }}>
      <ClickableArea />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    count: state.count,
    stuff: state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    connectToGameSessionSocket: () => dispatch({ type: "GAME_SESSION_SOCKET_CONNECT" })
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameSession);
