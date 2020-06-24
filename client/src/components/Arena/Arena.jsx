import React from 'react';
import { connect } from 'react-redux';

import { socketEmit } from '../../actions/socketActions';

function Arena(props) {
  const handleClick = () => {
    props.socketEmit({
      eventName: 'battleAction',
      data: { actionType: 'initiate' }
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
