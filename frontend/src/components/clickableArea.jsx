import React, { Component } from 'react';
import {connect} from 'react-redux';

import {bindActionCreators} from 'redux';
import { addToCount } from '../actions/countActions';

class ClickableArea extends React.Component {
  // componentWillMount() { // HERE WE ARE TRIGGERING THE ACTION
  //      this.props.stuffActions.fetchStuff();
  //    }

  // const socket = props.socket;

  handleClick = () => {
    this.props.addToCount();
    // setCount(count + 1);
    // socket.emit('areaClicked', 'yep');
  }

  //   renderData() {
  //     return <div>{this.props.stuffs}</div>;
  //   }
  //
  //
  //   render() {
  //     return (
  //       <div className="">
  //           {this.props.stuffs.length > 0 ?
  //             this.renderData()
  //             :
  //             <div className="">
  //               No Data
  //             </div>
  //           }
  //       </div>
  //     );
  //   }
  render() {
    console.log("this.props.stuff")
    console.log(this.props.stuff)

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
