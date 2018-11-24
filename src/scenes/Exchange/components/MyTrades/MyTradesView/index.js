import React, { PureComponent } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { inject } from 'mobx-react';
import { injectIntl } from 'react-intl';
import {
  withMobileDialog,
  Grid,
  Typography,
  withStyles } from '@material-ui/core';
import { satoshiToDecimal } from '../../../../../helpers/utility';
import styles from './styles.css';

@injectIntl
@inject('store')
@withStyles(styles, { withTheme: true })
class MyTradesView extends PureComponent {
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
    const { txid, status, from, to, boughtTokens, amount, price, tokenName, orderType, date } = this.props.event;
    const amountToken = satoshiToDecimal(amount);
    const totalToken = parseFloat((amountToken * price).toFixed(8));
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
