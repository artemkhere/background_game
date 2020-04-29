import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { connectToSocket } from '../actions/socketActions';
import { setCurrentScreen } from '../actions/applicationStateActions';
import { setUserData } from '../actions/userActions';

function Signup(props) {
  const { connectToSocket, setCurrentScreen, setUserData, user } = props;
  const [signupStep, setSignupStep] = useState('SignupForm');
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSignupStep('Loading');

    try {
      const newUserResponse = await axios.post("http://127.0.0.1:6969/api/signup", { email, password });
      localStorage.setItem('jwt', newUserResponse.data.jwt);
      setUserData(newUserResponse.data);
      setSignupStep('SignupSuccess');
    } catch (error) {
      setSignupStep('Error');
      setErrorMessage(error.message);
    }
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
          minLength="4"
          maxLength="24"
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

  const signupError = () => {
    return (
      <div>Error: {errorMessage}</div>
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
        <div>Signed in as: {user.email}</div>
        <div>User ID: {user.id}</div>
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
      case 'Error':
        toRender = signupError();
        break;
      case 'SignupSuccess':
        toRender = signupSuccess();
        break;
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
    socket: state.socket,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    connectToSocket: connectToSocket(dispatch),
    setCurrentScreen: setCurrentScreen(dispatch),
    setUserData: setUserData(dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
