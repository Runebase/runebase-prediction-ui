import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles, Card } from '@material-ui/core';
import { defineMessages } from 'react-intl';
import _Loading from '../../../../components/Loading';
import SellHistoryView from './SellHistoryView';


const messages = defineMessages({
  loadAllNewOrdersMsg: {
    id: 'load.allNewOrders',
    defaultMessage: 'loading',
  },
});

@inject('store')
@observer
export default class SellHistory extends Component {

  handleNext = async () => {
    this.props.store.sellHistoryStore.skip = this.props.store.sellHistoryStore.skip + 10;
    await this.props.store.sellHistoryStore.getSellHistoryInfo();
  }
  handlePrevious = async () => {
    this.props.store.sellHistoryStore.skip = this.props.store.sellHistoryStore.skip - 10;
    await this.props.store.sellHistoryStore.getSellHistoryInfo();
  }

  render() {
    const { classes } = this.props;
    const { sellHistoryStore, wallet } = this.props.store;
    return (
      <Fragment>
        <Card className='dashboardOrderBookTitle'>
          <p>Sell History ({ wallet.currentMarket })</p>
        </Card>
        <Trades sellHistoryStore={sellHistoryStore} />
        <button
          disabled={!sellHistoryStore.hasLess} 
          onClick={this.handlePrevious}
        >
          Previous Page
        </button>
        <button 
          onClick={this.handleNext}
          disabled={!sellHistoryStore.hasMore}
        >
          Next Page
        </button>
      </Fragment>
    );
  }
}

const Trades = observer(({ sellHistoryStore: { sellHistoryInfo } }) => {
  const sellHistory = (sellHistoryInfo || []).map((event, i) => <SellHistoryView key={i} index={i} event={event} />); // eslint-disable-line
  return (
    sellHistory
  );
});

