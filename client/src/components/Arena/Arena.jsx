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

  return (
    <div className="waste-container">
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
