import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { inject } from 'mobx-react';
import _ from 'lodash';
import { injectIntl, defineMessages } from 'react-intl';
import {
  Divider,
  withMobileDialog,
  Input, 
  Button, 
  Grid, 
  Typography, 
  withStyles, 
  ExpansionPanel, 
  ExpansionPanelSummary, 
  ExpansionPanelDetails,Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle } from '@material-ui/core';
import Slider from '@material-ui/lab/Slider';
import { Clear } from '@material-ui/icons';
import { TokenImage, OrderTypeIcon, StatusIcon } from '../../../helpers';


import styles from './styles';
import './styles.css';

@injectIntl
@inject('store')
@withStyles(styles, { withTheme: true })
class SellHistoryView extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    orderId: PropTypes.string,
  };

  static defaultProps = {
    orderId: undefined,
  };

  renderTrade(from, to, boughtTokens, amountToken, totalToken, totalToken2, tokenName, orderType) {
    if (boughtTokens !== "0000000000000000000000000000000000000000" && orderType === 'SELLORDER') {
      return (<Typography className='sold'>Sell {amountToken} {tokenName} for {totalToken} RUNES 1</Typography>);
    }
    if (boughtTokens !== "0000000000000000000000000000000000000000" && orderType === 'BUYORDER') {
      return (<Typography className='bought'>Buy {amountToken} {tokenName} for {totalToken2} RUNES 2</Typography>);
    }
    if (boughtTokens !== "0000000000000000000000000000000000000000" && orderType === 'SELLORDER') {
      return (<Typography className='bought'>Buy {amountToken} {tokenName} for {totalToken} RUNES 3</Typography>);
    }
    if (boughtTokens !== "0000000000000000000000000000000000000000" && orderType === 'BUYORDER') {
      return (<Typography className='sold'>Sell {totalToken2} {tokenName} for {amountToken} RUNES 4</Typography>);
    }     
  }
  render() {
    const { classes, fullScreen } = this.props;
    const { store: { wallet, global } } = this.props;
    const { orderId, txid, status, from, to, time, boughtTokens, soldTokens, amount, blockNum, price, tokenName, orderType, date } = this.props.event;
    const amountToken = parseFloat((amount / 1e8));
    const totalToken =  parseFloat((amountToken * price));
    const totalToken2 =  parseFloat((amountToken / price).toFixed(8));

    
    return (
      <div className={`classes.root ${status}`}>
        <Grid container className='myTradeContainer'>
          <Grid item xs={12}>
            <p>{date}</p>
          </Grid>
          <Grid item xs={12}>
            {this.renderTrade(from, to, boughtTokens, amountToken, totalToken, totalToken2, tokenName, orderType)} 
          </Grid>
          <Grid item xs={12}>
            <Typography variant="caption" gutterBottom>{txid}</Typography>
          </Grid>
        </Grid>       
      </div>
    );
  }
}

SellHistoryView.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(SellHistoryView);