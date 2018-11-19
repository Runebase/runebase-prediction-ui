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

import styles from './styles';
import './styles.css';

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
      return (<Typography className='sold'>Sell {amountToken} {tokenName} for {totalToken} RUNES 1</Typography>);
    }
    if (to === myaddress && boughtTokens !== '0000000000000000000000000000000000000000' && orderType === 'BUYORDER') {
      return (<Typography className='bought'>Buy {amountToken} {tokenName} for {totalToken2} RUNES 2</Typography>);
    }
    if (from === myaddress && boughtTokens !== '0000000000000000000000000000000000000000' && orderType === 'SELLORDER') {
      return (<Typography className='bought'>Buy {amountToken} {tokenName} for {totalToken} RUNES 3</Typography>);
    }
    if (from === myaddress && boughtTokens !== '0000000000000000000000000000000000000000' && orderType === 'BUYORDER') {
      return (<Typography className='sold'>Sell {totalToken2} {tokenName} for {amountToken} RUNES 4</Typography>);
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
      <div className={`classes.root ${status}`}>
        <Grid container className='myTradeContainer'>
          <Grid item xs={8}>
            <p>{date}</p>
          </Grid>
          <Grid item xs={4}>
            <p>{status}</p>
          </Grid>
          <Grid item xs={12}>
            {this.renderTrade(from, to, boughtTokens, myaddress, amountToken, totalToken, totalToken2, tokenName, orderType)}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="caption" gutterBottom>{txid}</Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withMobileDialog()(MyTradesView);
