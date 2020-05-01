import React from 'react';
import { connect } from 'react-redux';

import { setApplicationLoading } from '../actions/applicationStateActions';

function LoadingModal(props) {
  const { setApplicationLoading } = props;

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
  return {};
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
