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

  const handleTakeTurn = () => {
    props.socketEmit({
      eventName: 'battleAction',
      data: { actionType: 'takeTurn', move: 'smack' }
    });
  }

  return (
    <div className="waste-container">
      <button
        className="waste-button"
        onClick={handleClick}
      >
        Initiate
      </button>
      <button
        className="waste-button"
        onClick={handleTakeTurn}
      >
        Attack
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
