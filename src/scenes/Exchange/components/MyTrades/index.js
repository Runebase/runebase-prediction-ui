import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles, Card } from '@material-ui/core';
import { defineMessages } from 'react-intl';
import _Loading from '../../../../components/Loading';
import MyTradesView from './MyTradesView';
import styles from './styles';


const messages = defineMessages({
  loadAllNewOrdersMsg: {
    id: 'load.allNewOrders',
    defaultMessage: 'loading',
  },
});

@inject('store')
@observer
export default class MyTrades extends Component {

  handleNext = async () => {
    this.props.store.myTradeStore.skip = this.props.store.myTradeStore.skip + 10;
    await this.props.store.myTradeStore.getMyTradeInfo();
  }
  handlePrevious = async () => {
    this.props.store.myTradeStore.skip = this.props.store.myTradeStore.skip - 10;
    await this.props.store.myTradeStore.getMyTradeInfo();
  }

  render() {
    const { classes } = this.props;
    const { myTradeStore, wallet } = this.props.store;
    return (
      <Fragment>
        <Card className='dashboardOrderBookTitle'>
          <p>My Trades</p>
        </Card>
        <Trades myTradeStore={myTradeStore} />
        <div className='centerText'>
          <button
            disabled={!myTradeStore.hasLess} 
            onClick={this.handlePrevious}
          >
            Previous Page
          </button>
          <button 
            onClick={this.handleNext}
            disabled={!myTradeStore.hasMore}
          >
            Next Page
          </button>
        </div>
      </Fragment>
    );
  }
}

const Trades = observer(({ myTradeStore: { myTradeInfo } }) => {
  const myTrades = (myTradeInfo || []).map((event, i) => <MyTradesView key={i} index={i} event={event} />); // eslint-disable-line
  return (
    myTrades
  );
});

