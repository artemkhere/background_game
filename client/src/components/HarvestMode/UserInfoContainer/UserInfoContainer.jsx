import React from 'react';
import { connect } from 'react-redux';

import journal from'./journal.png';
import "./UserInfoContainer.scss";

import LevelInfo from './LevelInfo/LevelInfo';
import LevelBar from './LevelBar/LevelBar';
import SettingsMenu from './SettingsMenu/SettingsMenu';

export default function UserInfoContainer() {
  return (
    <div className="user-info-container">
      <div className="user-avatar" />
      <div className="info-container">
        <LevelBar />
        <div className="level-and-menu-container">
          <LevelInfo />
          <div className="menu-container">
            <img src={journal} id="journal" className="menu-icon disabled" alt="journal" />
            <SettingsMenu />
          </div>
        </div>
      </div>
    </div>
  );
}
