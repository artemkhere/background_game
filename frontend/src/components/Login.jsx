import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { connectToSocket } from '../actions/socketActions';
import { setCurrentScreen } from '../actions/applicationStateActions';
import { setUserData } from '../actions/userActions';

function Login(props) {
  const { connectToSocket, setCurrentScreen, setUserData, user } = props;
  const [loginStep, setLoginStep] = useState('LoginForm');
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
    setLoginStep('Loading');

    try {
      const loginResponse = await axios.post("http://127.0.0.1:6969/api/login", { email, password });
      localStorage.setItem('jwt', loginResponse.data.jwt);
      const userData = {
        id: loginResponse.data.id,
        email: loginResponse.data.email,
        loggedIn: true
      };
      setUserData(userData);
      setLoginStep('LoginSuccess');
    } catch (error) {
      setLoginStep('Error');
      setErrorMessage(error.message);
    }
  }

  const loginForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <h1>Login Into Your Account</h1>
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

  const loginLoading = () => {
    return (
      <div>Loading</div>
    );
  }

  const loginError = () => {
    return (
      <div>
        <div>Error: {errorMessage}</div>
        {loginForm()}
      </div>
    );
  }

  const handleStartNewGame = () => {
    setCurrentScreen('GameSession');
    connectToSocket();
  }

  const loginSuccess = () => {
    return (
      <div style={{ textAlign: "center" }}>
        <div>Logged in as: {user.email}</div>
        <div>User ID: {user.id}</div>
        <button onClick={handleStartNewGame}>Start New Game</button>
      </div>
    );
  }

  const renderLoginStep = () => {
    let toRender;

    switch(loginStep) {
      case 'LoginForm':
        toRender = loginForm();
        break;
      case 'Loading':
        toRender = loginLoading();
        break;
      case 'Error':
        toRender = loginError();
        break;
      case 'LoginSuccess':
        toRender = loginSuccess();
        break;
      default:
        toRender = <div>Error</div>;
    }

    return toRender;
  }

  return (
    <div>{renderLoginStep()}</div>
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
)(Login);