import React from 'react';
import { connect } from 'react-redux';

function CurrentConsumables(props) {
  const { consumables } = props.gameSession.gameState.harvest;

  const consumablesList = (consumables) => {
    return (
      <>
        {consumables.map((consumable) => {
          return (
            <div>
              <div>Name: {consumable.name}</div>
            </div>
          );
        })}
      </>
    );
  }

  return (
    <div style={{ textAlign: "right" }}>
      <div>Current Consumables:</div>
      {consumablesList(consumables)}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    gameSession: state.gameSession,
  };
}

export default connect(
  mapStateToProps
)(CurrentConsumables);
