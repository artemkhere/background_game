import React from 'react';
import { connect } from 'react-redux';

import TopMenu from './components/TopMenu';
import LandingPage from './components/LandingPage';
import GameSession from './components/GameSession';
// import Login from './components/Login';
// import Signup from './components/Signup';

function App(props) {
  const renderMainSection = () => {
    let toRender;

    switch(props.applicationState.currentScreen) {
      case 'LandingPage':
        toRender = <LandingPage />;
        break;
      case 'GameSession':
        toRender = <GameSession />;
        break;
      // case 'Login':
      //   toRender = <Login />;
      //   break;
      // case 'Signup':
      //   toRender = <Signup />;
      //   break;
      default:
        toRender = <div>Error</div>;
    }

    return toRender;
  }

  return (
    <div>
      <TopMenu />
      {renderMainSection()}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    applicationState: state.applicationState
  };
}

export default connect(
  mapStateToProps
)(App);
