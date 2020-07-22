import React from 'react';
import { connect } from 'react-redux';

import journal from'./journal.png';
import settings from'./settings.png';
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
          <button />
        </div>
        <div className="card">aiii</div>
      </div>
      <div className="right-section">
        <div className="user-info-container">
          <div className="user-avatar" />
          <div className="info-container">
            <div className="level-bar">
              <div className="level-filler" style={{ width: '50%' }} />
            </div>
            <div className="level-and-menu-container">
              <div className="level-info">
                lvl
                <span className="level-number">13</span>
              </div>
              <div className="menu-container">
                <img src={journal} id="journal" alt="journal" />
                <img src={settings} id="settings" alt="settings" />
              </div>
            </div>
          </div>
        </div>
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
