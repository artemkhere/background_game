import React, { Component } from "react";
import socketIOClient from "socket.io-client";

import ClickableArea from "./components/clickableArea";

class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:6969",
      socket: false // should be ported out into global state so anything can grab it
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    this.setState({ socket });
    socket.on("FromAPI", (data) => this.setState({ response: data }));
  }

  render() {
    const { response } = this.state;

    return (
        <div style={{ textAlign: "center" }}>
          {response
              ? <p>
                The temperature in Florence is: {response} °F
              </p>
              : <p>Loading...</p>}

          <ClickableArea socket={this.state.socket} />
        </div>
    );
  }
}

export default App;
