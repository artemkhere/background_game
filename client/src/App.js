import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import "./App.scss";

import { setUserData } from './actions/userActions';

import TopMenu from './components/TopMenu';
import ErrorModal from './components/ErrorModal';
import LoadingModal from './components/LoadingModal';
import LandingPage from './components/LandingPage';
import GameSession from './components/GameSession/GameSession';
import Login from './components/Login';
import Signup from './components/Signup';
import Logout from './components/Logout';
import Arena from './components/Arena/Arena';

function App(props) {
  const { setUserData, user, applicationState } = props;

  const authenticate = async (jwt) => {
    try {
      const authResponse = await axios.post(`${process.env.REACT_APP_HOST_URL}/api/auth`, { token: jwt });
      const userData = {
        id: authResponse.data.id,
        email: authResponse.data.email,
        loggedIn: true
      };
      setUserData(userData);
    } catch (error) {
      console.error('Error: failed to auth with jwt.')
    }
  }

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt && !user.loggedIn) { authenticate(jwt); }
  });

  const renderMainSection = () => {
    let toRender;

    switch(applicationState.currentScreen) {
      case 'LandingPage':
        toRender = <LandingPage />;
        break;
      case 'GameSession':
        toRender = <GameSession />;
        break;
      case 'Login':
        toRender = <Login />;
        break;
      case 'Signup':
        toRender = <Signup />;
        break;
      case 'Logout':
        toRender = <Logout />;
        break;
      case 'Arena':
        toRender = <Arena />;
        break;
      default:
        toRender = <div>Error</div>;
    }

    return toRender;
  }

  return (
    <div>
      <TopMenu />
      {applicationState.error && <ErrorModal />}
      {applicationState.loading && <LoadingModal />}
      {renderMainSection()}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    applicationState: state.applicationState,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setUserData: setUserData(dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
