import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { inject } from 'mobx-react';
import { FormattedMessage, injectIntl, intlShape, defineMessages } from 'react-intl';
import { Button, Grid, Typography, withStyles, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import cx from 'classnames';
import { sum } from 'lodash';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExecuteOrderTxConfirmDialog from '../ExecuteOrderTxConfirmDialog';

import EventWarning from '../../../../../components/EventWarning';
import styles from './styles';
import './styles.css';
const messages = defineMessages({
  executeOrderConfirmMsgSendMsg: {
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
    const { classes, index, store: { wallet }  } = this.props;
    const { orderId, txid, orderType, tokenName, buyToken, sellToken, amount, owner, blockNum, time, priceDiv, priceMul, price, token, type, status } = this.props.event;
    const { locale, messages: localeMessages, formatMessage } = this.props.intl;
    const amountToken = amount / 1e8;
    let total = amountToken * price;
    const exchangeAmount = amount;
    total = total.toFixed(8);
    return (
      <div className={`classes.root ${orderType}`}>
        <ExpansionPanel className={orderType}>
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
              <form>
                <div data-role="rangeslider">
                  <input type="range" name="range-1a" id="range-1a" min="0" max="100" value="40" data-popup-enabled="true" data-show-value="true" />
                </div>
              </form>
              <Grid item xs={6}>
                <div>
                  <Button onClick={ () =>  wallet.prepareExecuteOrderExchange(orderId, exchangeAmount) } color="primary">
                    Execute Order
                  </Button>
                  <ExecuteOrderTxConfirmDialog onCancelOrder={this.onExecuteOrder} id={messages.executeOrderConfirmMsgSendMsg.id} />
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
