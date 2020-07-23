import React from 'react';
import { connect } from 'react-redux';

import settingsBlack from'./settingsBlack.png';
import "./SettingsMenu.scss";

import { connectToSocket } from '../../../../actions/socketActions';

function SettingsMenu(props) {
  const { error, loading } = props.socket;
  const { resources } = props.gameSession;

  const { connectToSocket } = props;

  return (
    <div className="settings-menu-container">
      <img src={settingsBlack} className="selector" alt="settings" />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    socket: state.socket,
    gameSession: state.gameSession
  };
}

function mapDispatchToProps(dispatch) {
  return {
    connectToSocket: connectToSocket(dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsMenu);
