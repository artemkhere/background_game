import React from 'react';
import { connect } from 'react-redux';

import { socketEmit } from '../../actions/socketActions';

function Arena(props) {
  const handleClick = () => {
    props.socketEmit({
      eventName: 'battleAction',
      data: { actionType: 'initiateBattle' }
    });
  }

  const handleSmack = () => {
    props.socketEmit({
      eventName: 'battleAction',
      data: { actionType: 'takeTurn', move: 'smack' }
    });
  }

  const handleNap = () => {
    props.socketEmit({
      eventName: 'battleAction',
      data: { actionType: 'takeTurn', move: 'nap' }
    });
  }

  const handleLick = () => {
    props.socketEmit({
      eventName: 'battleAction',
      data: { actionType: 'takeTurn', move: 'lick' }
    });
  }

  const handleHeal = () => {
    props.socketEmit({
      eventName: 'characterAction',
      data: { actionType: 'heal' }
    });
  }

  const handleAddPoint = () => {
    props.socketEmit({
      eventName: 'characterAction',
      data: { actionType: 'distributePoints', targets: [{ target: 'stamina', amount: 1 }] }
    });
  }

  return (
    <div className="waste-container">
      <button
        className="waste-button"
        onClick={handleAddPoint}
      >
        Add Point
      </button>
      <button
        className="waste-button"
        onClick={handleHeal}
      >
        Heal
      </button>
      <button
        className="waste-button"
        onClick={handleClick}
      >
        Initiate
      </button>
      <button
        onClick={handleSmack}
      >
        Smack
      </button>
      <button
        onClick={handleNap}
      >
        Nap
      </button>
      <button
        onClick={handleLick}
      >
        Lick
      </button>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    socketEmit: socketEmit(dispatch)
  };
}

export default connect(
  () => { return {}; },
  mapDispatchToProps
)(Arena);
