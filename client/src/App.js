import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import "./App.scss";

import { setUserData } from './actions/userActions';

import TopMenu from './components/TopMenu';
import ErrorModal from './components/ErrorModal';
import LoadingModal from './components/LoadingModal';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Signup from './components/Signup';
import Logout from './components/Logout';
import HarvestMode from './components/HarvestMode/HarvestMode';
import ArenaMode from './components/ArenaMode/ArenaMode';

function App(props) {
  const { setUserData, user, applicationState } = props;
  const { currentScreen, error, loading } = applicationState;

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

    switch(currentScreen) {
      case 'LandingPage':
        toRender = <LandingPage />;
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
      case 'HarvestMode':
        toRender = <HarvestMode />;
        break;
      case 'ArenaMode':
        toRender = <ArenaMode />;
        break;
      default:
        toRender = <div>Error</div>;
    }

    return toRender;
  }

  const shouldRenderTopMenu = currentScreen !== 'HarvestMode' && currentScreen !== 'ArenaMode';

  return (
    <div className="app">
      {shouldRenderTopMenu && <TopMenu />}
      {error && <ErrorModal />}
      {loading && <LoadingModal />}
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
