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
import { FastForward, FastRewind, AccountBalanceWallet } from '@material-ui/icons';
import FundExchangeTxConfirmDialog from '../FundExchangeTxConfirmDialog';

const messages = defineMessages({
  txConfirmMsgSendMsg: {
    id: 'txConfirmMsg.send',
    defaultMessage: 'send to address {address}',
  },
});

@injectIntl
@inject('store')
@observer
export default class FundExchange extends Component {
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
  
  handleClickOpenDepositChoice = () => {
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

  handleClickOpenDepositDialog = (event) => {
    /* Needs Fix -> If Address Has enough tokens or runes */
    
    if (event.target.value === 'RUNES') {
      this.setState({ 
        tokenChoice: 'RUNES',
        available: this.props.store.wallet.currentAddressBalanceRunes,
      });
    }
    if (event.target.value === 'PRED') {
      this.setState({ 
        tokenChoice: 'PRED',
        available: this.props.store.wallet.currentAddressBalanceToken, 
      });
    }
    if (event.target.value === 'FUN') {
      this.setState({ 
        tokenChoice: 'FUN',
        available: this.props.store.wallet.currentAddressBalanceToken, 
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
  onWithdraw = () => {
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
        <FastRewind onClick={this.handleClickOpenDepositChoice} style={stylist.largeIcon}>Deposit</FastRewind> 
        <AccountBalanceWallet onClick={this.handleClickOpenDepositChoice} style={stylist.largeIcon}></AccountBalanceWallet>
        <p>Desposit</p>
        <Dialog
          open={this.state.openError}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Deposit</DialogTitle>
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
          <DialogTitle id="form-dialog-title">Deposit</DialogTitle>
          <DialogContent>
            <DialogContentText>
              What would you like to deposit?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button value='RUNES' onClick={this.handleClickOpenDepositDialog}>Deposit RUNES</Button>
            <Button value='PRED' onClick={this.handleClickOpenDepositDialog}>Deposit {this.props.store.wallet.market}</Button>
            <Button value='FUN' onClick={this.handleClickOpenDepositDialog}>Deposit FUN</Button>
            <Button onClick={this.handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.open2}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title2"
        >
          <DialogTitle id="form-dialog-title2">Deposit</DialogTitle>
          <DialogContent>
            <DialogContentText>
              How much {this.state.tokenChoice} would you like to deposit?              
            </DialogContentText>
              Current Address:
            <DialogContentText>
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
            <Button onClick={ () =>  wallet.prepareDepositExchange(this.state.address, this.state.amount, this.state.tokenChoice) } color="primary">
              Deposit
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <FundExchangeTxConfirmDialog onWithdraw={this.onWithdraw} id={messages.txConfirmMsgSendMsg.id} />
      </div>
    );
  }
}