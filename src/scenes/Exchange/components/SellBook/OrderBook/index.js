import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { injectIntl,  defineMessages } from 'react-intl';
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
  DialogTitle, 
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExecuteOrderTxConfirmDialog from '../ExecuteOrderTxConfirmDialog';

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
    orderId: PropTypes.string,
  };

  static defaultProps = {
    orderId: undefined,
  };
  constructor(props) {
    super(props);
    this.state = { open:1 };
  }
  onExecuteOrder = () => {
    if (this.props.store.wallet.currentAddressSelected === '') {
      this.setState({ 
        openError: true,
      });
      return;
    }
    this.setState({
      open: 0,
    });
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
    console.log(this.state.open);
    const { classes, store: { wallet }  } = this.props;
    const { orderId, txid, orderType, tokenName, buyToken, sellToken, amount, owner, blockNum, time, price, token, type, status } = this.props.event;
    const amountToken = amount / 1e8;
    let total = amountToken * price;
    const exchangeAmount = amount;
    total = total.toFixed(8);
    return (      
      <div className={`classes.root ${orderType}`}>
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
                  <Button 
                    onClick={ () =>{                      
                      if (this.props.store.wallet.currentAddressSelected === '')  {
                        this.addressCheck();                        
                      }
                      else {
                        wallet.prepareExecuteOrderExchange(orderId, exchangeAmount); 
                      }                      
                    }} 
                    color="primary">
                    Execute Order
                  </Button>
                  <ExecuteOrderTxConfirmDialog onExecuteOrder={this.onExecuteOrder} id={messages.executeOrderConfirmMsgSendMsg.id} />
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
