import React from 'react';
import { connect } from 'react-redux';

import { setApplicationError } from '../actions/applicationStateActions';

function ErrorModal(props) {
  const { setApplicationError, applicationState } = props;
  const error = applicationState.error;

  const handleCloseModal = () => {
    setApplicationError(false);
  }

  return (
    <div style={{ textAlign: "center" }}>
      <div>Error: {error && error.message}</div>
      <button onClick={handleCloseModal}>Close</button>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    applicationState: state.applicationState
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setApplicationError: setApplicationError(dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorModal);
