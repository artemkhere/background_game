import React from 'react';
import { connect } from 'react-redux';

import toiletPaper from'./toiletPaper.png';
import "./ResourcesInfoContainer.scss";

function ResourcesInfoContainer(props) {
  const { resources, gameState } = props.gameSession;

  return (
    <div className="resources-info-container">
      <img src={toiletPaper} id="resources-icon" alt="resources" />
      <div className="resources-info">
        <div className="resources-value">{ resources }</div>
        <div className="resources-stats">
          <div className="per-container per-click-container">
            <div className="per-descriptor">tp / click</div>
            <span className="per-value">37</span>
          </div>
          <div className="per-container per-cycle-container">
            <div className="per-descriptor">tp / cycle</div>
            <span className="per-value">{ gameState.harvest.resourcesPerCycle }</span>
          </div>
        </div>
      </div>
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
)(ResourcesInfoContainer);
