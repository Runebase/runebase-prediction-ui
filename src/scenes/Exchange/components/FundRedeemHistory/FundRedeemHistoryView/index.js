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
class FundRedeemHistoryView extends PureComponent {
  render() {
    const { store: { wallet } } = this.props;
    const { txid, type, token, tokenName, status, owner, time, date, amount, blockNum } = this.props.event;
    const amountToken = parseFloat((amount / 1e8));

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
            {type} {amount} {tokenName}
          </Grid>
          <Grid item xs={12} className='breakWord'>
            <Typography variant="caption" gutterBottom><a href={`https://explorer.runebase.io/tx/${txid}`}>{txid}</a></Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withMobileDialog()(FundRedeemHistoryView);
