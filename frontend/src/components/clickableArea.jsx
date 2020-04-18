import React from 'react';
import { connect } from 'react-redux';

import { socketEmit } from '../actions/socketActions';

function ClickableArea(props) {
  const handleClick = () => {
    props.socketEmit({ eventName: 'areaClicked' });
  }

  return (
    <div>
      <button onClick={handleClick}>
        Click me
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
)(ClickableArea);
