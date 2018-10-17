import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { Grid } from '@material-ui/core';
import theme from '../../config/theme';
import Loading from '../../components/EventListLoading';
import EventCard from './components/EventCard';
import OrderBook from './components/OrderBook';
import NewOrder from './components/NewOrder';
import PriceChart from './components/PriceChart';
import TradeData from './components/TradeData';
import TransactionHistory from './components/TransactionHistory';

@inject('store')
@observer
export default class Exchange extends Component {
  counterInterval = undefined;

  constructor() {
    super();
    this.state = {
      increasingCount: 0,
    };
  }

  componentDidMount() {
    this.props.store.exchange.init();
    const interval = 1;
    this.counterInterval = setInterval(() => {
      const { increasingCount } = this.state;
      this.setState({
        increasingCount: increasingCount + (interval / 1000000000),
      });
    }, interval * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.counterInterval);
  }

  render() {
    const { list, loadMore, loadingMore, loading } = this.props.store.exchange;
    if (loading) return <Loading />;
    const events = (list || []).map((event, i) => (
      <EventCard key={i} index={i} event={event} increasingCount={this.state.increasingCount} />
    )); // eslint-disable-line
    return (
      <Fragment>
        <Grid container>
          <Grid item xs={4}>
            <OrderBook />
            <NewOrder />
          </Grid>
          <Grid item xs={8}>
            <PriceChart />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={4}>
            <TradeData />
          </Grid>
          <Grid item xs={8}>
            <TransactionHistory />
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
