import React from 'react';
import { connect } from 'react-redux';

import "./LevelInfo.scss";

function LevelInfo(props) {
  const { gameState } = props.gameSession;
  const level = gameState.harvest.level;

  return (
    <div className="level-info">
      lvl
      <span className="level-number">{ level }</span>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    gameSession: state.gameSession
  };
}

function mapDispatchToProps(dispatch) { return {}; }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LevelInfo);
