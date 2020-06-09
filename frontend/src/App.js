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

function App(props) {
  const { setUserData, user, applicationState } = props;

  const authenticate = async () => {
    const jwt = localStorage.getItem('jwt');

    if (jwt && !user.loggedIn) {
      try {
        const authResponse = await axios.post("http://127.0.0.1:6969/api/auth", { token: jwt });
        const userData = {
          id: authResponse.data.id,
          email: authResponse.data.email,
          loggedIn: true
        };
        setUserData(userData);
      } catch (error) {
        console.log('Error: failed to auth with jwt.')
      }
    }
  }

  useEffect(() => {
    authenticate();
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
