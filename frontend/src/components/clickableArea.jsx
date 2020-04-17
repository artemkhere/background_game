import React from 'react';
import { connect } from 'react-redux';

import { addToCount } from '../actions/countActions';

class ClickableArea extends React.Component {
  handleClick = () => {
    this.props.addToCount();
  }

  render() {
    return (
      <div>
        <p>You clicked {this.props.count} times</p>
        <button onClick={this.handleClick}>
          Click me
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    count: state.count,
    stuff: state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addToCount: addToCount(dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClickableArea);
