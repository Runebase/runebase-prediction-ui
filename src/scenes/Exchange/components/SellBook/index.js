import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles, Card } from '@material-ui/core';
import { defineMessages } from 'react-intl';

import theme from '../../../../config/theme';
import OrderBook from './OrderBook';
import _Loading from '../../../../components/Loading';
import './style.css';


const messages = defineMessages({
  loadAllNewOrdersMsg: {
    id: 'load.allNewOrders',
    defaultMessage: 'loading',
  },
});

@inject('store')
@observer
export default class SellBook extends Component {
  componentDidMount() {
    this.props.store.sellStore.init();
  }
  handleNext = async () => {
    this.props.store.sellStore.skip = this.props.store.sellStore.skip + 10;
    await this.props.store.sellStore.getSellOrderInfo();
  }
  handlePrevious = async () => {
    this.props.store.sellStore.skip = this.props.store.sellStore.skip - 10;
    await this.props.store.sellStore.getSellOrderInfo();
  }

  render() {
    const { classes } = this.props;
    const { sellStore, wallet } = this.props.store;
    return (
      <Fragment>
        <Card className='dashboardOrderBookTitle'>
          <p>People Selling {wallet.market}</p>
        </Card>
        <SellOrders sellStore={sellStore} />
        <button
          disabled={sellStore.hasMoreSellOrders} 
          onClick={this.handlePrevious}
        >
          Previous Page
        </button>
        <button 
          onClick={this.handleNext}
          disabled={!sellStore.hasMoreSellOrders}
        >
          Next Page
        </button>
      </Fragment>
    );
  }
}

const SellOrders = observer(({ sellStore: { sellOrderInfo, loadMoreEvents, loading, loadingMore } }) => {
  if (loading) return <Loading />;
  const events = (sellOrderInfo || []).map((event, i) => <OrderBook key={i} index={i} event={event} />); // eslint-disable-line
  return (
    events
  );
});

const Loading = withStyles()(({ classes }) => <Row><_Loading className={classes.loading} text={messages.loadAllNewOrdersMsg} /></Row>);

const Row = withStyles()(({ classes, ...props }) => (
  <div className={classes.row} {...props} />
));

