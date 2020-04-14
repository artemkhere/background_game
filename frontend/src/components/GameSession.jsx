import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

import ClickableArea from './ClickableArea';

export default function GameSession() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [connectedToSocket, setConnectedToSocket] = useState(false);
  const [socket, setSocket] = useState(false);

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
