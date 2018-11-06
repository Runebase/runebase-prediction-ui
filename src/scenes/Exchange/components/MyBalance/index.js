import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';

import {
  Card,
  Grid,
  withStyles,
} from '@material-ui/core';

import styles from './styles';
import RedeemExchange from './RedeemExchange';

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

    return (
      <div>
        <Grid container>          
          <Grid item xs={12}>
            <RedeemExchange />                              
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Card className={classes.dashboardOrderBookTitle}>
                <p>My Exchange Balances</p>                
              </Card>
            </Grid>
            {(() => {
              if (wallet.currentAddressKey !== '') {
                return (
                  <Grid item xs={12}>
                    <Card className={classes.dashboardOrderBook}>
                      <Grid container>
                        <Grid item xs={3}>
                          <p>RUNES</p>
                          <p>{wallet.addresses[wallet.currentAddressKey].exchangerunes}</p>
                        </Grid>
                        <Grid item xs={3}>
                          <p>PRED</p>
                          <p>{wallet.addresses[wallet.currentAddressKey].exchangepred}</p>
                        </Grid>
                        <Grid item xs={3}>
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
