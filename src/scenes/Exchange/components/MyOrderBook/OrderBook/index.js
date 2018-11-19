import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import 'semantic-ui-css/semantic.min.css';
import { inject } from 'mobx-react';
import { injectIntl, defineMessages } from 'react-intl';
import {
  Button,
  Grid,
  Typography,
  withStyles,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CancelOrderTxConfirmDialog from '../CancelOrderTxConfirmDialog';
import { TokenImage, OrderTypeIcon, StatusIcon } from '../../../helpers';


import styles from './styles';
import './styles.css';
const messages = defineMessages({
  cancelOrderConfirmMsgSendMsg: {
    id: 'cancelOrderConfirmMsg.send',
    defaultMessage: 'send to address {address}',
  },
});

@injectIntl
@inject('store')
@withStyles(styles, { withTheme: true })
export default class OrderBook extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    orderId: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = { openError: false };
  }
  static defaultProps = {
    orderId: undefined,
  };
  onCancelOrder = () => {
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
    });
  };

  render() {
    const { classes } = this.props;
    const { store: { wallet } } = this.props;
    const { orderId, txid, amount, startAmount, owner, blockNum, time, price, token, type, status } = this.props.order;
    const amountToken = amount / 1e8;
    const startAmountToken = startAmount / 1e8;
    const filled = startAmount - amount;
    let total = amountToken * price;
    total = total.toFixed(8);
    return (
      <div className={`classes.root ${status}`}>
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
        <ExpansionPanel className={status}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Grid container className='centerText' wrap="nowrap">
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
              <Grid item xs={2}>
                <Typography noWrap>status</Typography>
                <Typography noWrap>{status}</Typography>
              </Grid>
            </Grid>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.dashboardOrderBookWrapper} >

            <Grid container className='centerText' >
              <Grid item xs={12}>
                <Grid container justify="center">
                  <Grid item xs={3}>
                    <p>{token}/RUNES</p>
                    <div className='fullwidth'>
                      <TokenImage token={token} />
                    </div>
                  </Grid>
                  <Grid item xs={3} className='inheritHeight'>
                    <p>{type}</p>
                    <OrderTypeIcon orderType={type} />
                  </Grid>
                  <Grid item xs={3} className='inheritHeight'>
                    <p>{status}</p>
                    <StatusIcon status={status} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container className='spacingOrderBook vcenter'>
                  <Grid item xs={3} className='inheritHeight ordersRoundBox'>
                    <Typography variant='title' className='ordersPropertyLabel'>amount</Typography>
                    <Typography variant='subheading' className='ordersPropertyContent inheritHeight'>{amountToken}</Typography>
                  </Grid>
                  <Grid item xs={3} className='inheritHeight ordersRoundBox'>
                    <Typography variant='title' className='ordersPropertyLabel'>price</Typography>
                    <div className='verticalCenter'>
                      <Typography variant='subheading' className='ordersPropertyContent inheritHeight'>{price}</Typography>
                    </div>
                  </Grid>
                  <Grid item xs={3} className='inheritHeight ordersRoundBox'>
                    <Typography variant='title' className='ordersPropertyLabel'>total</Typography>
                    <Typography variant='subheading' className='ordersPropertyContent inheritHeight'>{total}</Typography>
                  </Grid>
                  <Grid item xs={3} className='inheritHeight ordersRoundBox'>
                    <Typography variant='title' className='ordersPropertyLabel'>filled</Typography>
                    <div className='ordersPropertyContent inheritHeight'>
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography variant='subheading'>{filled}</Typography>
                        </Grid>
                        <span className='divider'></span>
                        <Grid item xs={12}>
                          <Typography variant='subheading'>{startAmountToken}</Typography>
                        </Grid>
                      </Grid>
                    </div>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}className='spacingOrderBook'>
                <Typography variant='subheading' className=''>owner:</Typography>
                <Typography className={classes.root}><a href={`https://explorer.runebase.io/address/${owner}`}>{owner}</a></Typography>
              </Grid>
              <Grid item xs={12} className='spacingOrderBook'>
                <Typography variant='subheading' className={classes.root}>txid:</Typography>
                <Typography className={classes.root}><a href={`https://explorer.runebase.io/tx/${txid}`}>{txid}</a></Typography>
              </Grid>
              <Grid item xs={6} className='spacingOrderBook'>
                <Typography variant='subheading'>created time</Typography>
                <Typography>{time}</Typography>
              </Grid>
              <Grid item xs={6} className='spacingOrderBook'>
                <Typography variant='subheading'>created blockNum</Typography>
                <Typography>{blockNum}</Typography>
              </Grid>
              <Grid item xs={12}>
                <div>
                  <Button onClick={() => wallet.prepareCancelOrderExchange(orderId)} color="primary">
                    Cancel Order
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
