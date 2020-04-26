import React, { useState } from 'react';
import { connect } from 'react-redux';

import { connectToSocket } from '../actions/socketActions';
import { setCurrentScreen } from '../actions/applicationStateActions';

function Signup(props) {
  const { connectToSocket, setCurrentScreen } = props;
  const [signupStep, setSignupStep] = useState('SignupForm');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setSignupStep('Loading');
  }

  const signupForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <h1>Sign Up For An Account</h1>
        <label>Email</label>
        <input
          name='email'
          type='email'
          placeholder='Email'
          value={email}
          onChange={handleEmailChange}
          required
        />
        <br/>
        <label>Password</label>
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <input type='submit'/>
      </form>
    );
  }

  const signupLoading = () => {
    return (
      <div>Loading</div>
    );
  }

  const handleStartNewGame = () => {
    setCurrentScreen('GameSession');
    // in this connectToSocket I will need to pass userID and jwt
    connectToSocket();
  }

  const signupSuccess = () => {
    return (
      <div style={{ textAlign: "center" }}>
        <div>Congrats, your account had been created!</div>
        <div>Signed in as: USER EMAIL GOES HERE</div>
        <button onClick={handleStartNewGame}>Start New Game</button>
      </div>
    );
  }

  const renderSignupStep = () => {
    let toRender;

    switch(signupStep) {
      case 'SignupForm':
        toRender = signupForm();
        break;
      case 'Loading':
        toRender = signupLoading();
        break;
      // case 'Error':
      //   // already logged in error needs to be handled here
      //   toRender = signupError();
      //   break;
      // case 'SignupSuccess':
      //   toRender = signupSuccess();
      //   break;
      default:
        toRender = <div>Error</div>;
    }

    return toRender;
  }

  return (
    <div>{renderSignupStep()}</div>
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
)(Signup);
