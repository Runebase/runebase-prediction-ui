import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles, Card } from '@material-ui/core';
import { defineMessages } from 'react-intl';
import _Loading from '../../../../components/Loading';
import BuyHistoryView from './BuyHistoryView';


const messages = defineMessages({
  loadAllNewOrdersMsg: {
    id: 'load.allNewOrders',
    defaultMessage: 'loading',
  },
});

@inject('store')
@observer
export default class BuyHistory extends Component {

  handleNext = async () => {
    this.props.store.buyHistoryStore.skip = this.props.store.buyHistoryStore.skip + 10;
    await this.props.store.buyHistoryStore.getBuyHistoryInfo();
  }
  handlePrevious = async () => {
    this.props.store.buyHistoryStore.skip = this.props.store.buyHistoryStore.skip - 10;
    await this.props.store.buyHistoryStore.getBuyHistoryInfo();
  }

  render() {
    const { classes } = this.props;
    const { buyHistoryStore, wallet } = this.props.store;
    return (
      <Fragment>
        <Card className='dashboardOrderBookTitle'>
          <p>Buy History ({ wallet.currentMarket })</p>
        </Card>
        <Trades buyHistoryStore={buyHistoryStore} />
        <button
          disabled={!buyHistoryStore.hasLess} 
          onClick={this.handlePrevious}
        >
          Previous Page
        </button>
        <button 
          onClick={this.handleNext}
          disabled={!buyHistoryStore.hasMore}
        >
          Next Page
        </button>
      </Fragment>
    );
  }
}

const Trades = observer(({ buyHistoryStore: { buyHistoryInfo } }) => {
  const buyHistory = (buyHistoryInfo || []).map((event, i) => <BuyHistoryView key={i} index={i} event={event} />); // eslint-disable-line
  return (
    buyHistory
  );
});

