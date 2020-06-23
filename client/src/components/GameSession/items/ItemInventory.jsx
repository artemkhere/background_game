import React from 'react';
import { connect } from 'react-redux';

import { socketEmit } from '../../../actions/socketActions';

function ItemInventory(props) {
  const { socketEmit } = props;
  const { gameState } = props.gameSession;

  const handleSellItem = (itemName) => {
    return () => {
      socketEmit({
        eventName: 'itemAction',
        data: { actionType: 'sell', itemName }
      });
    }
  }

  const handleEquipItem = (itemName) => {
    return () => {
      socketEmit({
        eventName: 'itemAction',
        data: { actionType: 'equip', itemName }
      });
    }
  }

  const itemList = (inventory) => {
    return (
      <>
        {inventory.map((item) => {
          return (
            <div>
              <div>Name: {item.name}</div>
              <div>Price: {item.price}</div>
              <div>Description: {item.description}</div>
              <button onClick={handleSellItem(item.name)}>Sell</button>
              <button onClick={handleEquipItem(item.name)}>Equip</button>
            </div>
          );
        })}
      </>
    );
  }

  return (
    <div style={{ textAlign: "right" }}>
      <div>Inventory:</div>
      {itemList(gameState.harvest.items.inventory)}
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
)(ItemInventory);
