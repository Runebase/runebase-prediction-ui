import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import 'semantic-ui-css/semantic.min.css';
import { inject } from 'mobx-react';
import { injectIntl } from 'react-intl';
import {
  withMobileDialog,
  Grid,
  Typography,
  withStyles } from '@material-ui/core';

import styles from './styles.css';

@injectIntl
@inject('store')
@withStyles(styles, { withTheme: true })
class MyTradesView extends PureComponent {
  static propTypes = {
    orderId: PropTypes.string,
  };

  static defaultProps = {
    orderId: undefined,
  };

  renderTrade(from, to, boughtTokens, myaddress, amountToken, totalToken, totalToken2, tokenName, orderType) {
    if (to === myaddress && boughtTokens !== '0000000000000000000000000000000000000000' && orderType === 'SELLORDER') {
      return (<Typography className='sold fat'>Sell {amountToken} {tokenName} for {totalToken} RUNES</Typography>);
    }
    if (to === myaddress && boughtTokens !== '0000000000000000000000000000000000000000' && orderType === 'BUYORDER') {
      return (<Typography className='bought fat'>Buy {amountToken} {tokenName} for {totalToken2} RUNES</Typography>);
    }
    if (from === myaddress && boughtTokens !== '0000000000000000000000000000000000000000' && orderType === 'SELLORDER') {
      return (<Typography className='bought fat'>Buy {amountToken} {tokenName} for {totalToken} RUNES</Typography>);
    }
    if (from === myaddress && boughtTokens !== '0000000000000000000000000000000000000000' && orderType === 'BUYORDER') {
      return (<Typography className='sold fat'>Sell {totalToken2} {tokenName} for {amountToken} RUNES</Typography>);
    }
  }
  render() {
    const { store: { wallet } } = this.props;
    const { orderId, txid, status, from, to, time, boughtTokens, soldTokens, amount, blockNum, price, tokenName, orderType, date } = this.props.event;
    const amountToken = parseFloat((amount / 1e8));
    const totalToken = parseFloat((amountToken * price));
    const totalToken2 = parseFloat((amountToken / price).toFixed(8));
    const myaddress = wallet.addresses[wallet.currentAddressKey].address;

    return (
      <div className={`${status}`}>
        <Grid container className='myTradeContainer'>
          <Grid item xs={8} className='breakWord'>
            <p>{date}</p>
          </Grid>
          <Grid item xs={4} className='breakWord'>
            <p className={`fat ${status}COLOR`}>{status}</p>
          </Grid>
          <Grid item xs={12} className='fat'>
            {this.renderTrade(from, to, boughtTokens, myaddress, amountToken, totalToken, totalToken2, tokenName, orderType)}
          </Grid>
          <Grid item xs={12} className='breakWord'>
            <Typography variant="caption" gutterBottom><a href={`https://explorer.runebase.io/tx/${txid}`}>{txid}</a></Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withMobileDialog()(MyTradesView);
