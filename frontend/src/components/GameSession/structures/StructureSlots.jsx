import React from 'react';
import { connect } from 'react-redux';

import { socketEmit } from '../../../actions/socketActions';

function StructureSlots(props) {
  const { socketEmit } = props;
  const { gameState } = props.gameSession;

  const handleSellStructure = (builtIndex) => {
    return () => {
      socketEmit({
        eventName: 'structureAction',
        data: { actionType: 'sell', builtIndex }
      });
    }
  }

  const structureSlots = (structuresBuilt) => {
    return (
      <>
        {structuresBuilt.map((structure, builtIndex) => {
          return (
            <div>
              <div>Name: {structure.name}</div>
              <button onClick={handleSellStructure(builtIndex)}>Sell</button>
            </div>
          );
        })}
      </>
    );
  }

  return (
    <div style={{ textAlign: "left" }}>
      <div>Structures:</div>
      {structureSlots(gameState.structures.built)}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    gameSession: state.gameSession,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    socketEmit: socketEmit(dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StructureSlots);
