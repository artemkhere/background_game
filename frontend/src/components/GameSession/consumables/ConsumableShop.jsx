import React from 'react';
import { connect } from 'react-redux';

import { socketEmit } from '../../../actions/socketActions';

function ConsumableShop(props) {
  const { socketEmit } = props;
  const { gameSchema } = props.gameSession;

  const handleBuyConsumable = (consumableName) => {
    return () => {
      socketEmit({
        eventName: 'consumableAction',
        data: { actionType: 'buy', consumableName }
      });
    }
  }

  // parse consumables to be displayed and not shown
  const consumableList = gameSchema.consumableShop.map((consumable) => {
    if (consumable.shouldDisplay) {
      return (
        <div>
          <div>Name: {consumable.name}</div>
          <div>Price: {consumable.price}</div>
          <div>Description: {consumable.description}</div>
          <button onClick={handleBuyConsumable(consumable.name)}>Buy Consumable</button>
        </div>
      );
    } else {
      return (
        <div>
          <div>??? MYSTERY STRUCTURE ???</div>
          <div>Will show when: {consumable.shouldDisplayRequirements}</div>
        </div>
      );
    }
  });

  return (
    <div style={{ textAlign: "left" }}>
      <div>Consumable Shop:</div>
      {consumableList}
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
)(ConsumableShop);
