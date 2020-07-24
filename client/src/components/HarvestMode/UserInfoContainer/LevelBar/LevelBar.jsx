import React from 'react';
import { connect } from 'react-redux';

import "./LevelBar.scss";

function LevelBar(props) {
  const { gameState, gameSchema } = props.gameSession;
  const { harvestLevelRequirements } = gameSchema;
  const { level, experience } = gameState.harvest;

  let width = 100;
  if (harvestLevelRequirements.length >= level) {
    const percent = harvestLevelRequirements[level] / 100;
    width = Math.round(experience / percent);
  }
  if (width < 10) { width = 10; }

  return (
    <div className="level-bar">
      <div className="level-filler" style={{ width: `${width}%` }} />
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
)(LevelBar);
