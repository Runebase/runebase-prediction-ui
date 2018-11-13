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
class MyTradesView extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    orderId: PropTypes.string,
  };

  static defaultProps = {
    orderId: undefined,
  };

  renderTrade(from, to, boughtTokens, myaddress, amountToken, totalToken, totalToken2, tokenName, orderType) {
    if (from === myaddress && boughtTokens === "0000000000000000000000000000000000000000") {
      return `Sell ${amountToken} ${tokenName} for ${totalToken} RUNES from`;
    }
    if (to === myaddress && boughtTokens === "0000000000000000000000000000000000000000") {
      return `Buy ${amountToken} ${tokenName} for ${totalToken} RUNES`;
    }
    if (to === myaddress && boughtTokens !== "0000000000000000000000000000000000000000" && orderType === 'SELLORDER') {
      return `Buy ${amountToken} ${tokenName} for ${totalToken2} RUNES to`;
    }
    if (to === myaddress && boughtTokens !== "0000000000000000000000000000000000000000" && orderType === 'BUYORDER') {
      return `Buy ${amountToken} ${tokenName} for ${totalToken2} RUNES to2`;
    }
    if (from === myaddress && boughtTokens !== "0000000000000000000000000000000000000000" && orderType === 'SELLORDER') {
      return `Buy ${amountToken} ${tokenName} for ${totalToken} RUNES`;
    }
    if (from === myaddress && boughtTokens !== "0000000000000000000000000000000000000000" && orderType === 'BUYORDER') {
      return `Sell ${totalToken2} ${tokenName} for ${amountToken} RUNES`;
    }     
  }
  render() {
    const { classes, fullScreen } = this.props;
    const { store: { wallet, global } } = this.props;
    const { orderId, txid, status, from, to, time, boughtTokens, soldTokens, amount, blockNum, price, tokenName, orderType, date } = this.props.event;
    const amountToken = amount / 1e8;
    const totalToken = amountToken * price;
    const totalToken2 = amountToken / price;
    const myaddress = wallet.addresses[wallet.currentAddressKey].address;
    
    return (
      <div className={`classes.root ${status}`}>
        <Grid container>
          <Grid item xs={8}>
            <p>{date}</p>
          </Grid>
          <Grid item xs={4}>
            <p>{status}</p>
          </Grid>
        </Grid>        
        <p>{this.renderTrade(from, to, boughtTokens, myaddress, amountToken, totalToken, totalToken2, tokenName, orderType)}</p>        
        <p>{txid}</p>
      </div>
    );
  }
}

MyTradesView.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(MyTradesView);