import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { inject } from 'mobx-react';
import { FormattedMessage, injectIntl, intlShape, defineMessages } from 'react-intl';
import { Button, Grid, Typography, withStyles, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import cx from 'classnames';
import { sum } from 'lodash';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CancelOrderTxConfirmDialog from '../CancelOrderTxConfirmDialog';

import EventWarning from '../../../../../components/EventWarning';
import styles from './styles';
import './styles.css';
const messages = defineMessages({
  cancelOrderConfirmMsgSendMsg: {
    id: 'redeemConfirmMsg.send',
    defaultMessage: 'send to address {address}',
  },
});

@injectIntl
@inject('store')
@withStyles(styles, { withTheme: true })
export default class OrderBook extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    intl: intlShape.isRequired, // eslint-disable-line react/no-typos
    index: PropTypes.number.isRequired,
    orderId: PropTypes.string,
  };

  static defaultProps = {
    orderId: undefined,
  };


  render() {
    const { classes, index } = this.props;
    const { store: { wallet } } = this.props;
    const { orderId, txid, buyToken, sellToken, amount, owner, blockNum, time, priceDiv, priceMul, price, token, type, status } = this.props.event;
    const { locale, messages: localeMessages, formatMessage } = this.props.intl;
    const amountToken = amount / 1e8;
    let total = amountToken * price;
    total = total.toFixed(8);
    return (
      <div className={`classes.root ${status}`}>
        <ExpansionPanel className={status}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Grid container> 
              <Grid item xs={2} zeroMinWidth>
                <Typography noWrap>orderId</Typography>
                <Typography noWrap>{orderId}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography noWrap>token</Typography>
                <Typography noWrap>{token}</Typography> 
              </Grid>
              <Grid item xs={2}>
                <Typography noWrap>amount</Typography>
                <Typography noWrap>{amountToken}</Typography> 
              </Grid>
              <Grid item xs={2}>
                <Typography noWrap>price</Typography>
                <Typography noWrap>{price}</Typography> 
              </Grid>
              <Grid item xs={2}>
                <Typography noWrap>type</Typography>
                <Typography noWrap>{type}</Typography> 
              </Grid>
            </Grid>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.dashboardOrderBookWrapper}>
            <Grid container>
              <Grid item xs={12}>
                <Typography className={classes.root}>type: {type}</Typography>
                <Typography className={classes.root}>token: {token}</Typography>
                <Typography className={classes.root}>owner: {owner}</Typography>
                <Typography>buyToken: {buyToken}</Typography>
                <Typography>sellToken: {sellToken}</Typography>
                <Typography>priceMul: {priceMul}</Typography>
                <Typography>priceDiv: {priceDiv}</Typography>
                <Typography className={classes.root}>amount: {amountToken}</Typography>
                <Typography className={classes.root}>price: {price}</Typography>                
                <Typography className={classes.root}>total: {total}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>created time: {time}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>created blockNum: {blockNum}</Typography>
              </Grid>
              <Grid item xs={6}>
                <div>
                  <Button onClick={ () =>  wallet.prepareCancelOrderExchange(orderId) } color="primary">
                    Cancel
                  </Button>
                  <CancelOrderTxConfirmDialog onCancelOrder={this.onCancelOrder} id={messages.cancelOrderConfirmMsgSendMsg.id} />
                </div>
              </Grid>
            </Grid>
            <Grid container>
              
            </Grid>
            <Grid container>
              
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}
