import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles, Card, Typography, Tab, Tabs, AppBar } from '@material-ui/core';
import { defineMessages } from 'react-intl';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import _Loading from '../../../../components/Loading';
import OrderBook from './OrderBook';
import styles from './styles';
import './styles.css';

@inject('store')
@observer
@withStyles(styles, { withTheme: true })
export default class MyOrderBook extends Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  render() {
    const { classes, theme } = this.props;
    const { global } = this.props.store;
    return (
      <Fragment>
        <Card className={classes.dashboardOrderBookTitle}>
          <p>My Orders</p>
        </Card>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab label="Current" />
            <Tab label="FulFilled" />
            <Tab label="Canceled" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <Orders allNewOrders={global} />
          <OrdersFulFilled allFulFilledOrders={global} />
          <OrdersCanceled allCanceledOrders={global} />
        </SwipeableViews>       
      </Fragment>
    );
  }
}

const Orders = observer(({ allNewOrders: { myOrderInfo, loading } }) => {
  const newOrders = (myOrderInfo || []).map((order, i) => <OrderBook key={i} index={i} order={order} />); // eslint-disable-line
  return (
    newOrders
  );
});

const OrdersFulFilled = observer(({ allFulFilledOrders: { fulfilledOrderInfo, loading } }) => {
  const filledOrders = (fulfilledOrderInfo || []).map((order, i) => <OrderBook key={i} index={i} order={order} />); // eslint-disable-line
  return (
    filledOrders
  );
});

const OrdersCanceled = observer(({ allCanceledOrders: { canceledOrderInfo, loading } }) => {
  const canceledOrders = (canceledOrderInfo || []).map((order, i) => <OrderBook key={i} index={i} order={order} />); // eslint-disable-line
  return (
    canceledOrders
  );
});

