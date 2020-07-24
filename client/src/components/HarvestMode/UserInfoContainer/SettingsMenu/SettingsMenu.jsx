import React, { useState } from 'react';
import { connect } from 'react-redux';

import settingsBlack from'./settingsBlack.png';
import settingsWhite from'./settingsWhite.png';
import "./SettingsMenu.scss";

import { disconnectFromSocket } from '../../../../actions/socketActions';
import { setCurrentScreen } from '../../../../actions/applicationStateActions';
import { setUserLoggedIn } from '../../../../actions/userActions';

function SettingsMenu(props) {
  const [menuOpen, setMenuOpen] = useState(false);

  const {
    disconnectFromSocket,
    setCurrentScreen,
    setUserLoggedIn,
    user
  } = props;
  const userLoggedIn = user.loggedIn;

  const openMenu = () => { setMenuOpen(true); }
  const closeMenu = () => { setMenuOpen(false); }

  const handleLogin = () => {
    closeMenu();
    disconnectFromSocket();
    setCurrentScreen('Login');
  }

  const handleLogout = () => {
    closeMenu();
    disconnectFromSocket();
    localStorage.removeItem('jwt');
    localStorage.removeItem('gameSaveID');
    setUserLoggedIn(false);
    setCurrentScreen('Logout');
  }

  const handleSignup = () => {
    closeMenu();
    disconnectFromSocket();
    setCurrentScreen('Signup');
  }

  const renderMenu = () => {
    return (
      <>
        <div className="click-detector" onClick={closeMenu} />
        <div className="menu-underlay">
          <img
            src={settingsWhite}
            onClick={closeMenu}
            className="selector"
            id="settings-close-menu"
            alt="settings"
          />
          {!userLoggedIn && <div className="menu-option" onClick={handleLogin}>Login</div>}
          {!userLoggedIn && <div className="menu-option" onClick={handleSignup}>Signup</div>}
          {userLoggedIn && <div className="menu-option" onClick={handleLogout}>Logout</div>}
        </div>
      </>
    );
  }

  return (
    <div className="settings-menu-container">
      {menuOpen ?
        renderMenu()
        :
        <img src={settingsBlack} onClick={openMenu} className="selector" alt="settings" />
      }
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
    disconnectFromSocket: disconnectFromSocket(dispatch),
    setCurrentScreen: setCurrentScreen(dispatch),
    setUserLoggedIn: setUserLoggedIn(dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsMenu);
