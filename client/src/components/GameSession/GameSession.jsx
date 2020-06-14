import React from 'react';
import { connect } from 'react-redux';

import { connectToSocket } from '../../actions/socketActions';
import ClickableArea from './ClickableArea';
import ItemShop from './items/ItemShop';
import ItemInventory from './items/ItemInventory';
import ItemsEquipped from './items/ItemsEquipped';
import StructureShop from './structures/StructureShop';
import StructureSlots from './structures/StructureSlots';
import ConsumableShop from './consumables/ConsumableShop';
import CurrentConsumables from './consumables/CurrentConsumables';

function GameSession(props) {
  const { error, loading } = props.socket;
  const { resources } = props.gameSession;

  const { connectToSocket } = props;

  if (error) {
    return (
      <div>
        <div>There was an error</div>
        <button onClick={connectToSocket}>Reconnect</button>
      </div>
    );
  };

  if (loading) { return <div>Loading...</div>; }

  return (
    <div style={{ textAlign: "center" }}>
      <ItemShop />
      <ItemInventory />
      <div>Resources: {resources}</div>
      <ClickableArea />
      <ItemsEquipped />
      <StructureShop />
      <StructureSlots />
      <ConsumableShop />
      <CurrentConsumables />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    socket: state.socket,
    gameSession: state.gameSession
  };
}

function mapDispatchToProps(dispatch) {
  return {
    connectToSocket: connectToSocket(dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameSession);
