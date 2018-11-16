import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles, Card } from '@material-ui/core';
import { defineMessages } from 'react-intl';

import theme from '../../../../config/theme';
import OrderBook from './OrderBook';
import _Loading from '../../../../components/Loading';
import './style.css';


const messages = defineMessages({
  loadAllEventsMsg: {
    id: 'load.allEvents',
    defaultMessage: 'loading',
  },
});

@inject('store')
@observer
export default class BuyBook extends Component {
  componentDidMount() {
    this.props.store.buyStore.init();

  }

  handleNext = async () => {
    this.props.store.buyStore.skip = this.props.store.buyStore.skip + 10;
    await this.props.store.buyStore.getBuyOrderInfo();
  }
  handlePrevious = async () => {    
    this.props.store.buyStore.skip = this.props.store.buyStore.skip - 10;
    await this.props.store.buyStore.getBuyOrderInfo();
  }
  
  render() {
    const { classes } = this.props;
    const { buyStore, wallet } = this.props.store;
    return (
      <Fragment>
        <Card className='dashboardOrderBookTitle'>
          <p>People Buying {wallet.market}</p>
        </Card>
        <Events buyStore={buyStore} />
        <button
          disabled={!buyStore.hasLess} 
          onClick={this.handlePrevious}
        >
          Previous Page
        </button>
        <button 
          onClick={this.handleNext}
          disabled={!buyStore.hasMore}
        >
          Next Page
        </button>
      </Fragment>
    );
  }
}

const Events = observer(({ buyStore: { buyOrderInfo, loadMoreEvents, loading, loadingMore } }) => {
  if (loading) return <Loading />;
  const events = (buyOrderInfo || []).map((event, i) => <OrderBook key={i} index={i} event={event} />); // eslint-disable-line
  return (
    events
  );
});

const Loading = withStyles()(({ classes }) => <Row><_Loading className={classes.loading} text={messages.loadAllEventsMsg} /></Row>);

const Row = withStyles()(({ classes, ...props }) => (
  <div className={classes.row} {...props} />
));
