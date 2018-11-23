import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import 'semantic-ui-css/semantic.min.css';
import { inject } from 'mobx-react';
import _ from 'lodash';
import { injectIntl, defineMessages } from 'react-intl';
import {
  withMobileDialog,
  Input,
  Button,
  Grid,
  Typography,
  withStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle } from '@material-ui/core';
import Slider from '@material-ui/lab/Slider';
import { Clear } from '@material-ui/icons';
import { TxSentDialog } from 'components';
import ExecuteOrderTxConfirmDialog from '../ExecuteOrderTxConfirmDialog';
import { TokenImage, OrderTypeIcon, StatusIcon } from '../../../helpers';
import { satoshiToDecimal, decimalToSatoshi } from '../../../../../helpers/utility';


import styles from './styles';
import './styles.css';
const messages = defineMessages({
  executeOrderConfirmMsgSendMsg: {
    id: 'executeOrderConfirmMsg.send',
    defaultMessage: 'send to address {address}',
  },
});

@injectIntl
@inject('store')
@withStyles(styles, { withTheme: true })
class OrderBook extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    orderId: PropTypes.string,
  };

  static defaultProps = {
    orderId: undefined,
  };
  constructor(props) {
    super(props);
    this.state = {
      openError: false,
      exchangeAmount: 0,
      total: 0,
      open: false,
    };
  }

  handleClickOpen = async (orderId) => {
    try {
      await this.props.store.global.setSelectedOrderId(orderId);
      await this.props.store.global.getSelectedOrderInfo();
      this.setState({ open: true });
    } catch (error) {
      console.log('error');
    }
  };

  onExecuteOrder = () => {
    this.setState({
      openError: false,
      open: false,
    });
    if (this.props.store.wallet.currentAddressSelected === '') {
      this.setState({
        openError: true,
      });
    }
  }

  addressCheck = () => {
    if (this.props.store.wallet.currentAddressSelected === '') {
      this.setState({
        openError: true,
      });
    }
  }

  handleClose = () => {
    this.setState({
      openError: false,
      open: false,
    });
  };

  closeAll = () => {
    this.setState({
      open: false,
      openError: false,
    });
    this.props.store.wallet.closeTxDialog();
  }

  handleChange = (event, value, price) => {
    const newTotal = value * price;
    this.setState({
      exchangeAmount: value.toFixed(8),
      total: newTotal.toFixed(8),
    });
  };

  changeAmount = (event, price, walletAmount, amountToken, maxSlider) => {
    const regex = /^[0-9]+(\.\d{1,8})?$/;
    let total;
    total = event.target.value * price;
    if (this.props.store.wallet.currentAddressSelected === '') {
      this.setState({
        hasError: true,
      });
    } else {
      if (event.target.value === '' || regex.test(event.target.value)) {
        this.setState({
          exchangeAmount: event.target.value,
          total: total.toFixed(8),
          hasError: false,
        });
      }
      if (total > walletAmount) {
        total = maxSlider * price;
        this.setState({
          exchangeAmount: maxSlider,
          total: total.toFixed(8),
          hasError: false,
        });
      }
    }
  }

  render() {
    const { classes, fullScreen } = this.props;
    const { store: { wallet, global } } = this.props;
    const { orderId, txid, buyToken, sellToken, amount, startAmount, owner, blockNum, time, price, token, type, status } = this.props.event;
    const amountTokenLabel = satoshiToDecimal(amount);
    const amountToken = global.selectedOrderInfo.amount / 1e8;
    const startAmountToken = satoshiToDecimal(global.selectedOrderInfo.startAmount);
    const filled = satoshiToDecimal((global.selectedOrderInfo.startAmount - global.selectedOrderInfo.amount));
    let total = amountToken;
    total = total.toFixed(8).replace(/\.?0+$/, '');
    const exchangeAmount = decimalToSatoshi(this.state.exchangeAmount);
    let walletAmount;
    let availableGasAmount;
    let maxSlider;

    if (wallet.currentAddressKey !== '') {
      switch (token) {
        case 'PRED':
          walletAmount = wallet.addresses[wallet.currentAddressKey].exchangepred;
          availableGasAmount = wallet.addresses[wallet.currentAddressKey].runebase;
          break;
        case 'FUN':
          walletAmount = wallet.addresses[wallet.currentAddressKey].exchangefun;
          availableGasAmount = wallet.addresses[wallet.currentAddressKey].runebase;
          break;
        default:
          walletAmount = 0;
          availableGasAmount = wallet.addresses[wallet.currentAddressKey].runebase;
          break;
      }
    }

    let maxAmount = walletAmount;
    maxAmount = _.floor(maxAmount, 3);
    if (maxAmount < total) {
      maxSlider = maxAmount;
      maxSlider = maxSlider.toFixed(8).replace(/\.?0+$/, '');
    } else {
      maxSlider = amountToken;
    }
    return (
      <div className={`classes.root ${type}`}>
        <Dialog
          open={this.state.openError}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Withdraw</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please select an address first.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
        <div className={type}>
          <div>
            <Grid container className='centerText gridLabelContainer' wrap="nowrap">
              <Grid item xs={9} zeroMinWidth>
                <Grid container>
                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={4} zeroMinWidth>
                        <Typography className='listLabel'>orderId</Typography>
                        <Typography className='listInfo'>{orderId}</Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography className='listLabel'>status</Typography>
                        <Typography className={`fat ${status}COLOR`}>{status}</Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography className='listLabel'>amount</Typography>
                        <Typography className='listInfo'>{amountTokenLabel}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} className='spacingOrdersLabel'>
                    <Grid container>
                      <Grid item xs={4}>
                        <Typography className='listLabel'>token</Typography>
                        <Typography className='listInfo'>{token}</Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography className='listLabel'>type</Typography>
                        <Typography className={`fat ${type}COLOR`}>{type}</Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography className='listLabel'>price</Typography>
                        <Typography className='listInfo'>{price}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={3} className='buttonCell'>
                <button
                  className="ui negative button"
                  onClick={() => this.handleClickOpen(orderId)}
                >
                  Sell
                </button>
              </Grid>
            </Grid>
          </div>
        </div>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
          className="xParent"
        >
          <Clear className='cancelIconRed xOrder' onClick={this.handleClose} />
          <DialogTitle id="responsive-dialog-title">Order Id: {global.selectedOrderInfo.orderId}</DialogTitle>
          <DialogContent>
            <div className={classes.dashboardOrderBookWrapper}>
              <Grid container className='centerText xOverflow'>
                <Grid item xs={12}>
                  <Grid container justify="center">
                    <Grid item xs={3}>
                      <p>{global.selectedOrderInfo.token}/RUNES</p>
                      <div className='fullwidth'>
                        <TokenImage token={global.selectedOrderInfo.token} />
                      </div>
                    </Grid>
                    <Grid item xs={3} className='inheritHeight'>
                      <p>{global.selectedOrderInfo.type}</p>
                      <OrderTypeIcon orderType={global.selectedOrderInfo.type} />
                    </Grid>
                    <Grid item xs={3} className='inheritHeight'>
                      <p>{global.selectedOrderInfo.status}</p>
                      <StatusIcon status={global.selectedOrderInfo.status} />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container className='spacingOrderBook vcenter'>
                    <Grid item xs={3} className='inheritHeight ordersRoundBox'>
                      <Typography variant='title' className='ordersPropertyLabel'>amount</Typography>
                      <Typography variant='subheading' className='ordersPropertyContent inheritHeight'>{amountToken}</Typography>
                      <Typography variant='subheading' className='ordersPropertyContent inheritHeight'>{global.selectedOrderInfo.token}</Typography>
                    </Grid>
                    <Grid item xs={3} className='inheritHeight ordersRoundBox'>
                      <Typography variant='title' className='ordersPropertyLabel'>price</Typography>
                      <Typography variant='subheading' className='ordersPropertyContent inheritHeight'>{global.selectedOrderInfo.price}</Typography>
                      <Typography variant='subheading' className='ordersPropertyContent inheritHeight'>RUNES</Typography>
                    </Grid>
                    <Grid item xs={3} className='inheritHeight ordersRoundBox'>
                      <Typography variant='title' className='ordersPropertyLabel'>total</Typography>
                      <Typography variant='subheading' className='ordersPropertyContent inheritHeight'>{total}</Typography>
                      <Typography variant='subheading' className='ordersPropertyContent inheritHeight'>RUNES</Typography>
                    </Grid>
                    <Grid item xs={3} className='inheritHeight ordersRoundBox'>
                      <Typography variant='title' className='ordersPropertyLabel'>filled</Typography>
                      <div className='ordersPropertyContent inheritHeight'>
                        <Grid container>
                          <Grid item xs={12}>
                            <Typography variant='subheading'>{filled}</Typography>
                          </Grid>
                          <span className='filledDivider'></span>
                          <Grid item xs={12}>
                            <Typography variant='subheading'>{startAmountToken}</Typography>
                          </Grid>
                        </Grid>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}className='spacingOrderBook'>
                  <div className="ui horizontal divider">
                    Owner
                  </div>
                  <Typography className={classes.root}><a href={`https://explorer.runebase.io/address/${global.selectedOrderInfo.owner}`}>{global.selectedOrderInfo.owner}</a></Typography>
                </Grid>
                <Grid item xs={12} className='spacingOrderBook'>
                  <div className="ui horizontal divider">
                    TX ID
                  </div>
                  <Typography className={classes.root}><a href={`https://explorer.runebase.io/tx/${global.selectedOrderInfo.txid}`}>{global.selectedOrderInfo.txid}</a></Typography>
                </Grid>
                <Grid item xs={6} className='spacingOrderBook'>
                  <Typography variant='subheading' className={classes.root}>Created Time</Typography>
                  <Typography>{global.selectedOrderInfo.time}</Typography>
                </Grid>
                <Grid item xs={6} className='spacingOrderBook'>
                  <Typography variant='subheading' className={classes.root}>Created BlockNum</Typography>
                  <Typography>{global.selectedOrderInfo.blockNum}</Typography>
                </Grid>
                <div className="ui horizontal divider">
                  Trade
                </div>
                <Grid item xs={6}>
                  <Typography variant='subheading' className={classes.root}>{global.selectedOrderInfo.token} Available</Typography>
                  <Typography>{walletAmount}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant='subheading' className={classes.root}>Gas Available</Typography>
                  <Typography>{availableGasAmount}</Typography>
                </Grid>
                <div className="ui horizontal divider">
                </div>
                <Typography variant='subheading' className={classes.root}>Amount</Typography>
                <Grid item xs={12}>
                  <Slider
                    className='sliderAmount'
                    max={maxSlider}
                    step={0.00000001}
                    value={this.state.exchangeAmount}
                    aria-labelledby="label"
                    onChange={(e, val) => this.handleChange(e, val, price)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Input className='inputWidth inputOrderSpacing' type="number" step="0.00000001" min="0" max={amountToken} value={this.state.exchangeAmount} onChange={(event) => { this.changeAmount(event, price, walletAmount, amountToken, maxSlider); }} name="amount" />
                </Grid>
                <Grid item xs={12}>
                  {this.state.hasError && <span>Please select an address</span>}
                  {this.state.total && <span className='messageStyle'>Sell<span className='fat'>{this.state.exchangeAmount}</span> {token} for <span className='fat'>{this.state.total}</span> RUNES</span>}
                </Grid>
                <Grid item xs={12}>
                  <div>
                    <button
                      className="ui negative button buyButton"
                      onClick={() => {
                        if (this.props.store.wallet.currentAddressSelected === '') {
                          this.addressCheck();
                        } else {
                          wallet.prepareExecuteOrderExchange(global.selectedOrderInfo.orderId, exchangeAmount.toString());
                        }
                      }}
                    >
                      Sell
                    </button>
                    <ExecuteOrderTxConfirmDialog onExecuteOrder={this.onExecuteOrder} id={messages.executeOrderConfirmMsgSendMsg.id} />
                  </div>
                </Grid>
              </Grid>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default withMobileDialog()(OrderBook);
