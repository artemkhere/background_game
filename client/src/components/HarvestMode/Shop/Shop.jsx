import React, { useState } from 'react';
import { connect } from 'react-redux';

import "./Shop.scss";

function Shop(props) {
  const [shopSection, setShopSection] = useState('consumables');
  const { gameSchema } = props.gameSession;

  let renderMainSection;
  let consumablesTabClass, itemsTabClass, structuresTabClass;
  consumablesTabClass = itemsTabClass = structuresTabClass = 'tab';

  switch(shopSection) {
    case 'consumables':
      renderMainSection = <div>consumables</div>;
      consumablesTabClass += ' selected';
      break;
    case 'items':
      renderMainSection = <div>items</div>;
      itemsTabClass += ' selected';
      break;
    case 'structures':
      renderMainSection = <div>structures</div>;
      structuresTabClass += ' selected';
      break;
    default:
      renderMainSection = <div>error</div>;
      break;
  }

  return (
    <div className="shop">
      <div className="tabs-container">
        <div
          className={consumablesTabClass}
          onClick={() => { setShopSection('consumables'); }}
        >
          <span className="tab-name">consumables</span>
        </div>
        <div
          className={itemsTabClass}
          onClick={() => { setShopSection('items'); }}
        >
          <span className="tab-name">items</span>
        </div>
        <div
          className={structuresTabClass}
          onClick={() => { setShopSection('structures'); }}
        >
          <span className="tab-name">structures</span>
        </div>
      </div>
      {renderMainSection}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    gameSession: state.gameSession
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Shop);
