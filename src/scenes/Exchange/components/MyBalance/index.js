import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { FastForward, FastRewind, AccountBalanceWallet } from '@material-ui/icons';
import { inject, observer } from 'mobx-react';

import {
  Grid,
  Card,
  withStyles,
} from '@material-ui/core';

import { SortBy } from 'constants';
import styles from './styles';

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
          <Grid item xs={8}>
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
          <Grid item xs={4}>
            <Grid container>
              <Grid item xs={12} style={stylist.heightRow}>
                <FastForward style={stylist.largeIcon}>Withdraw</FastForward>
                <AccountBalanceWallet style={stylist.largeIcon}></AccountBalanceWallet>              
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <p style={stylist.floatright}>Withdraw</p>
              </Grid>
            </Grid>          
          </Grid>        
        </Grid>
      </withStyles>
    );
  }
}
