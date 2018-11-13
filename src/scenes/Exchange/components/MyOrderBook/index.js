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
  constructor (props) {
    super(props);
    this.state = {
      isButtonDisabledActivePrev: this.props.store.activeOrderStore.hasLess,
      isButtonDisabledActiveNext: this.props.store.activeOrderStore.hasMore,
      isButtonDisabledFulfilledPrev: this.props.store.fulfilledOrderStore.hasLess,
      isButtonDisabledFulfilledNext: this.props.store.fulfilledOrderStore.hasMore,
      isButtonDisabledCanceledPrev: this.props.store.canceledOrderStore.hasLess,
      isButtonDisabledCanceledNext: this.props.store.canceledOrderStore.hasMore,
      value: 0,
    };
  }

  handleActiveNext = async () => {
    this.props.store.activeOrderStore.skip = this.props.store.activeOrderStore.skip + 10;
    await this.props.store.activeOrderStore.getActiveOrderInfo();
    this.setState({
      isButtonDisabledActivePrev: this.props.store.activeOrderStore.hasLess,
      isButtonDisabledActiveNext: this.props.store.activeOrderStore.hasMore,
    });
  }
  
  handleActivePrevious = async () => {    
    this.props.store.activeOrderStore.skip = this.props.store.activeOrderStore.skip - 10;
    await this.props.store.activeOrderStore.getActiveOrderInfo();
    this.setState({
      isButtonDisabledActivePrev: this.props.store.activeOrderStore.hasLess,
      isButtonDisabledActiveNext: this.props.store.activeOrderStore.hasMore,
    });
  }

  handleFulfilledNext = async () => {
    this.props.store.fulfilledOrderStore.skip = this.props.store.fulfilledOrderStore.skip + 10;
    await this.props.store.fulfilledOrderStore.getActiveOrderInfo();
    this.setState({
      isButtonDisabledActivePrev: this.props.store.fulfilledOrderStore.hasLess,
      isButtonDisabledActiveNext: this.props.store.fulfilledOrderStore.hasMore,
    });
  }
  
  handleFulfilledPrevious = async () => {    
    this.props.store.fulfilledOrderStore.skip = this.props.store.fulfilledOrderStore.skip - 10;
    await this.props.store.fulfilledOrderStore.getFulfilledOrderInfo();
    this.setState({
      isButtonDisabledFulfilledPrev: this.props.store.fulfilledOrderStore.hasLess,
      isButtonDisabledFulfilledNext: this.props.store.fulfilledOrderStore.hasMore,
    });
  }

  handleCanceledNext = async () => {
    this.props.store.canceledOrderStore.skip = this.props.store.canceledOrderStore.skip + 10;
    await this.props.store.canceledOrderStore.getCanceledOrderInfo();
    this.setState({
      isButtonDisabledCanceledPrev: this.props.store.canceledOrderStore.hasLess,
      isButtonDisabledCanceledNext: this.props.store.canceledOrderStore.hasMore,
    });
  }
  
  handleCanceledPrevious = async () => {    
    this.props.store.canceledOrderStore.skip = this.props.store.canceledOrderStore.skip - 10;
    await this.props.store.canceledOrderStore.getCanceledOrderInfo();
    this.setState({
      isButtonDisabledCanceledPrev: this.props.store.canceledOrderStore.hasLess,
      isButtonDisabledCanceledNext: this.props.store.canceledOrderStore.hasMore,
    });
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme } = this.props;
    const { global, activeOrderStore, fulfilledOrderStore, canceledOrderStore } = this.props.store;
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
          <Orders activeOrderStore={activeOrderStore} />
          <OrdersFulFilled fulfilledOrderStore={fulfilledOrderStore} />
          <OrdersCanceled canceledOrderStore={canceledOrderStore} />
        </SwipeableViews>
        {this.state.value === 0 &&
          <div>
            <button
              disabled={!this.state.isButtonDisabledActivePrev} 
              onClick={this.handleActivePrevious}
            >
              Previous Page 
            </button>
            <button
              onClick={this.handleActiveNext}
              disabled={!this.state.isButtonDisabledActiveNext}
            >
              Next Page
            </button>
          </div>
        }
        {this.state.value === 1 &&
          <div>
            <button
              disabled={!this.state.isButtonDisabledFulfilledPrev} 
              onClick={this.handleFulfilledPrevious}
            >
              Previous Page
            </button>
            <button 
              onClick={this.handleFulfilledNext}
              disabled={!this.state.isButtonDisabledFulfilledNext}
            >
              Next Page
            </button>
          </div>
        }
        {this.state.value === 2 &&
          <div>
            <button
              disabled={!this.state.isButtonDisabledCanceledPrev} 
              onClick={this.handleCanceledPrevious}
            >
              Previous Page
            </button>
            <button 
              onClick={this.handleCanceledNext}
              disabled={!this.state.isButtonDisabledCanceledNext}
            >
              Next Page
            </button>
          </div>
        }         
      </Fragment>
    );
  }
}

const Orders = observer(({ activeOrderStore: { activeOrderInfo, loading } }) => {
  const activeOrders = (activeOrderInfo || []).map((order, i) => <OrderBook key={i} index={i} order={order} />); // eslint-disable-line
  return (
    activeOrders
  );
});

const OrdersFulFilled = observer(({ fulfilledOrderStore: { fulfilledOrderInfo, loading } }) => {
  const filledOrders = (fulfilledOrderInfo || []).map((order, i) => <OrderBook key={i} index={i} order={order} />); // eslint-disable-line
  return (
    filledOrders
  );
});

const OrdersCanceled = observer(({ canceledOrderStore: { canceledOrderInfo, loading } }) => {
  const canceledOrders = (canceledOrderInfo || []).map((order, i) => <OrderBook key={i} index={i} order={order} />); // eslint-disable-line
  return (
    canceledOrders
  );
});

