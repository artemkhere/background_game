import React from 'react';
import { connect } from 'react-redux';

import { socketEmit } from '../../../actions/socketActions';

function StructureShop(props) {
  const { socketEmit } = props;
  const { gameSchema } = props.gameSession;

  const handleBuyStructure = (structureName) => {
    return () => {
      socketEmit({
        eventName: 'structureAction',
        data: { actionType: 'buy', structureName }
      });
    }
  }

  // parse structures to be displayed and not shown
  const structureList = gameSchema.structureShop.map((structure) => {
    if (structure.shouldDisplay) {
      const baseInfo = (
        <div>
          <div>Name: {structure.name}</div>
          <div>Price: {structure.price}</div>
          <div>Description: {structure.description}</div>
        </div>
      );

      if (structure.canBePurchased) {
        return (
          <div>
            {baseInfo}
            <button onClick={handleBuyStructure(structure.name)}>Buy Structure</button>
          </div>
        );
      } else {
        return (
          <div>
            {baseInfo}
            <div>Requirements to buy: {structure.canBePurchasedRequirements}</div>
          </div>
        );
      }
    } else {
      return (
        <div>
          <div>??? MYSTERY STRUCTURE ???</div>
          <div>Will show when: {structure.shouldDisplayRequirements}</div>
        </div>
      );
    }
  });

  return (
    <div style={{ textAlign: "right" }}>
      <div>Structure Shop:</div>
      {structureList}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    gameSession: state.gameSession,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    socketEmit: socketEmit(dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StructureShop);
