import React from 'react';
import { connect } from 'react-redux';

import { socketEmit } from '../../../actions/socketActions';

function ItemsEquipped(props) {
  const { socketEmit } = props;
  const { gameState } = props.gameSession;

  const handleUnequipItem = (equippedIndex) => {
    return () => {
      socketEmit({
        eventName: 'itemAction',
        data: { actionType: 'unequip', equippedIndex }
      });
    }
  }

  const equippedList = (equipped) => {
    return (
      <>
        {equipped.map((item, equippedIndex) => {
          return (
            <div>
              <div>Name: {item.name}</div>
              <button onClick={handleUnequipItem(equippedIndex)}>Unequip</button>
            </div>
          );
        })}
      </>
    );
  }

  return (
    <div style={{ textAlign: "left" }}>
      <div>Equipped Items:</div>
      {equippedList(gameState.items.equipped)}
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
)(ItemsEquipped);
