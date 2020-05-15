import React from 'react';
import { connect } from 'react-redux';

import { socketEmit } from '../../../actions/socketActions';

function ItemShop(props) {
  const { socketEmit, gameSchema } = props;

  const handleBuyItem = (itemName) => {
    return () => {
      socketEmit({
        eventName: 'itemAction',
        data: { actionType: 'buy', itemName }
      });
    }
  }

  // parse items to be displayed and not shown
  const itemList = gameSchema.itemShop.map((item) => {
    if (item.shouldDisplay) {
      const baseInfo = (
        <div>
          <div>Name: {item.name}</div>
          <div>Price: {item.price}</div>
          <div>Description: {item.description}</div>
        </div>
      );

      if (item.canBePurchased) {
        return (
          <div>
            {baseInfo}
            <button onClick={handleBuyItem(item.name)}>Buy Item</button>
          </div>
        );
      } else {
        return (
          <div>
            {baseInfo}
            <div>Requirements to buy: {item.canBePurchasedRequirements}</div>
          </div>
        );
      }
    } else {
      return (
        <div>
          <div>??? MYSTERY ITEM ???</div>
          <div>Will show when: {item.shouldDisplayRequirements}</div>
        </div>
      );
    }
  });

  return (
    <div style={{ textAlign: "left" }}>
      <div>Item Shop:</div>
      {itemList}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    gameSchema: state.gameSchema
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
)(ItemShop);
