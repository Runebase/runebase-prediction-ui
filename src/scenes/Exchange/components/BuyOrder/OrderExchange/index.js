import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { 
  TextField, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle, 
} from '@material-ui/core';
import { injectIntl, defineMessages } from 'react-intl';
import { inject, observer } from 'mobx-react';
import { FastForward, AccountBalanceWallet } from '@material-ui/icons';
import OrderExchangeTxConfirmDialog from '../OrderExchangeTxConfirmDialog';

const messages = defineMessages({
  orderConfirmMsgSendMsg: {
    id: 'redeemConfirmMsg.send',
    defaultMessage: 'send to address {address}',
  },
});

@injectIntl
@inject('store')
@observer
export default class RedeemExchange extends Component {
  constructor(props) {
    super(props);
    this.state = { open:1 };
  }
  onOrder = () => {
    this.setState({
      open: 0,
    });
  }
  addressCheck = () => {
    if (this.props.store.wallet.currentAddressBalanceKey === '') {
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
    const { dialogVisible, classes, store: { wallet } } = this.props;
    console.log(this.state);
    return (      
      <div>

        <Button 
          onClick={ () =>{                      
            if (this.props.store.wallet.currentAddressBalanceKey === '')  {
              this.addressCheck();                        
            }
            else {
              wallet.prepareOrderExchange(this.props.price, this.props.amount, wallet.currentMarket, this.props.orderType);
            }                      
          }}
          color="primary">
          Buy {wallet.currentMarket}
        </Button>
        <OrderExchangeTxConfirmDialog onOrder={this.onOrder} id={messages.orderConfirmMsgSendMsg.id} />
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
      </div>
    );
  }
}