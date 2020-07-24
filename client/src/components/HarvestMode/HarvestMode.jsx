import React from 'react';
import { connect } from 'react-redux';

import "./HarvestMode.scss";

import { connectToSocket } from '../../actions/socketActions';
import ClickableArea from './ClickableArea';
import ItemShop from './items/ItemShop';
import ItemInventory from './items/ItemInventory';
import ItemsEquipped from './items/ItemsEquipped';
import StructureShop from './structures/StructureShop';
import StructureSlots from './structures/StructureSlots';
import ConsumableShop from './consumables/ConsumableShop';
import CurrentConsumables from './consumables/CurrentConsumables';

import UserInfoContainer from './UserInfoContainer/UserInfoContainer';
import ResourcesInfoContainer from './ResourcesInfoContainer/ResourcesInfoContainer';

function HarvestMode(props) {
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

  // return (
  //   <div style={{ textAlign: "center" }}>
  //     <ItemShop />
  //     <ItemInventory />
  //     <div>Resources: {resources}</div>
  //     <ClickableArea />
  //     <ItemsEquipped />
  //     <StructureShop />
  //     <StructureSlots />
  //     <ConsumableShop />
  //     <CurrentConsumables />
  //   </div>
  // );

  return (
    <div className="harvest-mode">
      <div className="main-section">
        <div className="mode-container">
          <h1 className="mode-name">Harvest Mode</h1>
        </div>
        <div className="card">
          <ClickableArea />
          <ItemShop />
          <ItemInventory />
          <ItemsEquipped />
          <StructureShop />
          <StructureSlots />
        </div>
      </div>
      <div className="right-panel">
        <UserInfoContainer />
        <ResourcesInfoContainer />
      </div>
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
)(HarvestMode);
