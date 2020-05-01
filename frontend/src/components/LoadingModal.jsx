import React from 'react';
import { connect } from 'react-redux';

import { setApplicationLoading } from '../actions/applicationStateActions';

function LoadingModal(props) {
  const { setApplicationLoading, applicationState } = props;
  const error = applicationState.loading;

  const handleCloseModal = () => {
    setApplicationLoading(false);
  }

  return (
    <div style={{ textAlign: "center" }}>
      <div>Loading</div>
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
    setApplicationLoading: setApplicationLoading(dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoadingModal);
