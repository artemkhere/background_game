import React from 'react';
import { connect } from 'react-redux';

import { connectToSocket, disconnectFromSocket } from '../actions/socketActions';
import { setCurrentScreen } from '../actions/applicationStateActions';
import { setUserLoggedIn } from '../actions/userActions';

function TopMenu(props) {
  const {
    connectToSocket, disconnectFromSocket, setCurrentScreen,
    setUserLoggedIn, user
  } = props;
  const userLoggedIn = user.loggedIn;

  const handlePlay = () => {
    setCurrentScreen('GameSession');
    connectToSocket();
  }

  const handleLogout = () => {
    disconnectFromSocket();
    localStorage.removeItem('jwt');
    setUserLoggedIn(false);
    setCurrentScreen('Logout');
  }

  const handleSignup = () => {
    disconnectFromSocket();
    setCurrentScreen('Signup');
  }

  const renderMainSection = () => {
    let toRender = <button onClick={handleSignup}>Sign Up</button>

    if (userLoggedIn) {
      toRender = (
        <>
          <button>Profile</button>
          <button onClick={handleLogout}>Logout</button>
        </>
      );
    }

    return toRender;
  }

  return (
    <div style={{ textAlign: "right" }}>
      <button onClick={handlePlay}>Play</button>
      {renderMainSection()}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    connectToSocket: connectToSocket(dispatch),
    disconnectFromSocket: disconnectFromSocket(dispatch),
    setCurrentScreen: setCurrentScreen(dispatch),
    setUserLoggedIn: setUserLoggedIn(dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopMenu);
