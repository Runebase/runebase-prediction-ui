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
import RedeemExchangeTxConfirmDialog from '../RedeemExchangeTxConfirmDialog';

const messages = defineMessages({
  redeemConfirmMsgSendMsg: {
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
    this.state = {
      open: false,
      open2: false,
      openError: false,
      amount: 0,
      tokenChoice: '',
      address: '',
      available: '',
    };
  }  
  
  handleClickOpenRedeemChoice = () => {
    if (this.props.store.wallet.currentAddressBalanceKey === '') {
      this.setState({ 
        open: false,
        open2: false, 
        openError: true,
      });
      return;
    }
    this.setState({ 
      open: true,
      open2: false, 
    });
  };

  handleClickOpenRedeemDialog = (event) => {
    /* Needs Fix -> If Address Has enough tokens or runes */
    if (event.target.value === this.props.store.wallet.market) {
      this.setState({ 
        tokenChoice: this.props.store.wallet.market,
        available: this.props.store.wallet.currentAddressBalanceToken, 
      });
    }
    if (event.target.value === 'RUNES') {
      this.setState({ 
        tokenChoice: 'RUNES',
        available: this.props.store.wallet.currentAddressBalanceRunes,
      });
    }
    this.setState({ 
      open: false,
      open2: true, 
      address: this.props.store.wallet.currentAddressBalanceKey,
    });
  };

  handleClose = () => {
    this.setState({ 
      open: false,
      open2: false,
      openError: false, 
    });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  onRedeem = () => {
    this.setState({
      open: false,
      open2: false,
    });
  }
  render() {
    const { dialogVisible, classes, store: { wallet } } = this.props;
    const stylist = {
      largeIcon: {
        width: 70,
        height: 70,
      },
      heightRow: {
        height: 75,
      },
    };
    return (      
      <div>        
        <AccountBalanceWallet onClick={this.handleClickOpenRedeemChoice}  style={stylist.largeIcon}></AccountBalanceWallet>
        <FastForward onClick={this.handleClickOpenRedeemChoice}  style={stylist.largeIcon}></FastForward>
        <p>Withdraw</p>
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
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Withdraw from Exchange</DialogTitle>
          <DialogContent>
            <DialogContentText>
              What would you like to withdraw?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button value='RUNES' onClick={this.handleClickOpenRedeemDialog}>withdraw RUNES</Button>
            <Button value={this.props.store.wallet.market} onClick={this.handleClickOpenRedeemDialog}>withdraw {this.props.store.wallet.market}</Button>
            <Button onClick={this.handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.open2}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title2"
        >
          <DialogTitle id="form-dialog-title2">withdraw</DialogTitle>
          <DialogContent>
            <DialogContentText>
              How much {this.state.tokenChoice} would you like to withdraw?
            </DialogContentText>
            <DialogContentText>
              Current Address:
            </DialogContentText>
            <DialogContentText>
              {this.state.address}
            </DialogContentText>
            <DialogContentText>
              Available:
            </DialogContentText>
            <DialogContentText>
              {this.state.available} {this.state.tokenChoice}
            </DialogContentText>
            <TextField
              id="standard-number"
              label="Amount"
              value={this.state.amount}
              onChange={this.handleChange('amount')}
              type="number"
              min={0}
              max={20}
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={ () =>  wallet.prepareRedeemExchange(this.state.address, this.state.amount, this.state.tokenChoice) } color="primary">
              Withdraw
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <RedeemExchangeTxConfirmDialog onRedeem={this.onRedeem} id={messages.redeemConfirmMsgSendMsg.id} />
      </div>
    );
  }
}