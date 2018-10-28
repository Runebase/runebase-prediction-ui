import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { FastForward, AccountBalanceWallet } from '@material-ui/icons';
import { inject, observer } from 'mobx-react';

import {
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

  render() {
    const { store: { wallet } } = this.props;
    const stylist = {
      largeIcon: {
        width: 70,
        height: 70,
        float: 'right',
      },
      floatright: {
        float: 'right',
      },
      heightRow: {
        height: 75,
      },
    };

    return (
      <withStyles>
        <Grid container>          
          <Grid item xs={12}>
            <RedeemExchange />                              
          </Grid>
          <Grid container>
            {wallet.addresses.map((addressData) => {
              console.log(wallet.currentAddressBalanceKey);
              if(addressData.address === wallet.currentAddressBalanceKey){
                return (
                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={3}>
                        <p>RUNES</p>
                        <p>{addressData.exchangerunes}</p>
                      </Grid>
                      <Grid item xs={3}>
                        <p>PRED</p>
                        <p>{addressData.exchangepred}</p>
                      </Grid>
                      <Grid item xs={3}>
                        <p>FUN</p>
                        <p>{addressData.exchangefun}</p>
                      </Grid>
                    </Grid>
                  </Grid>
                );}
              return null;
            })}
          </Grid>         
        </Grid>
      </withStyles>
    );
  }
}
