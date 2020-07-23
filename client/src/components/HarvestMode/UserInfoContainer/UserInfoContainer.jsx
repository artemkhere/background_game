import React from 'react';
import { connect } from 'react-redux';

import journal from'./journal.png';
import "./UserInfoContainer.scss";

import { connectToSocket } from '../../../actions/socketActions';

import SettingsMenu from './SettingsMenu/SettingsMenu';

function UserInfoContainer(props) {
  const { error, loading } = props.socket;
  const { resources } = props.gameSession;

  const { connectToSocket } = props;

  return (
    <div className="user-info-container">
      <div className="user-avatar" />
      <div className="info-container">
        <div className="level-bar">
          <div className="level-filler" style={{ width: '50%' }} />
        </div>
        <div className="level-and-menu-container">
          <div className="level-info">
            lvl
            <span className="level-number">13</span>
          </div>
          <div className="menu-container">
            <img src={journal} id="journal" className="menu-icon disabled" alt="journal" />
            <SettingsMenu />
          </div>
        </div>
      </div>
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
)(UserInfoContainer);
