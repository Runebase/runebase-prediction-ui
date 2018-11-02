import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { Grid } from '@material-ui/core';
import Loading from '../../components/EventListLoading';
import MyOrderBook from './components/MyOrderBook';
import PriceChart from './components/PriceChart';
import TradeData from './components/TradeData';
import Markets from './components/Markets';
import MarketInfo from './components/MarketInfo';
import MyBalance from './components/MyBalance';
import TransactionHistory from './components/TransactionHistory';
import BuyOrder from './components/BuyOrder';
import SellOrder from './components/SellOrder';
import BuyBook from './components/BuyBook';
import SellBook from './components/SellBook';

@inject('store')
@observer
export default class Exchange extends Component {

  render() {
    const { loading } = this.props.store.exchange;
    if (loading) return <Loading />;
    return (
      <Fragment>
        <Grid container>
          <Grid item xs={4}>
            <MyBalance />  
            <Markets />  
            <MyOrderBook />
            <TradeData />          
          </Grid>
          <Grid item xs={8}>
            <Grid>
              <Grid item xs={12}>
                <MarketInfo />
              </Grid>
            </Grid>
            <PriceChart 
              id="chart"
            />
            <Grid container>
              <BuyOrder />
              <SellOrder />
            </Grid>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={4}>
          </Grid>
          <Grid item xs={4}>
            <SellBook />
          </Grid>
          <Grid item xs={4}>
            <BuyBook />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={4}>
          </Grid>
          <Grid item xs={8}>
            <TransactionHistory />
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
