import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';

import {
  Card,
  Grid,
  withStyles,
} from '@material-ui/core';

import RedeemExchange from './RedeemExchange';
import styles from './styles.css';

@injectIntl
@withStyles(styles, { withTheme: true })
@inject('store')
@observer
export default class myBalance extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };
  render() {
    const { classes, store: { wallet } } = this.props;
    const hasPred = (wallet.market === 'PRED') ? 'MarketBalanceActive' :'NotSoActive';
    const hasFun = (wallet.market === 'FUN') ? 'MarketBalanceActive' :'NotSoActive';

    return (
      <div>
        <Grid container>          
          <Grid item xs={12}>
            <RedeemExchange />                              
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Card className='dashboardOrderBookTitle'>
                <p>My Exchange Balances</p>                
              </Card>
            </Grid>
            {(() => {
              if (wallet.currentAddressKey !== '') {
                return (
                  <Grid item xs={12}>
                    <Card className='dashboardOrderBook'>
                      <Grid container>
                        <Grid item xs={3}>
                          <p>RUNES</p>
                          <p>{wallet.addresses[wallet.currentAddressKey].exchangerunes}</p>
                        </Grid>
                        <Grid item xs={3} className={hasPred}>
                          <p>PRED</p>
                          <p>{wallet.addresses[wallet.currentAddressKey].exchangepred}</p>
                        </Grid>
                        <Grid item xs={3} className={hasFun}>
                          <p>FUN</p>
                          <p>{wallet.addresses[wallet.currentAddressKey].exchangefun}</p>
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                );
              }
              return (
                <Grid item xs={12}>
                  <Card className={classes.dashboardOrderBook}>
                    <Grid container>
                      <Grid item xs={12}>
                        <p>...</p>
                      </Grid>                      
                    </Grid>
                  </Card>
                </Grid>
              );                        
            })()}            
          </Grid>         
        </Grid>
      </div>
    );
  }
}
