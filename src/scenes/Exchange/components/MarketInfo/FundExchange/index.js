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
import { FastRewind, AccountBalanceWallet } from '@material-ui/icons';
import { TxSentDialog } from 'components';
import FundExchangeTxConfirmDialog from '../FundExchangeTxConfirmDialog';
import './styles.css';

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
    if (this.props.store.wallet.currentAddressSelected === '') {
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
    if (event.target.value === 'RUNES') {
      this.setState({ 
        tokenChoice: 'RUNES',
        available: this.props.store.wallet.addresses[this.props.store.wallet.currentAddressKey].runebase,
      });
    }
    if (event.target.value === 'PRED') {
      this.setState({ 
        tokenChoice: 'PRED',
        available: this.props.store.wallet.addresses[this.props.store.wallet.currentAddressKey].pred,
      });
    }
    if (event.target.value === 'FUN') {
      this.setState({ 
        tokenChoice: 'FUN',
        available: this.props.store.wallet.addresses[this.props.store.wallet.currentAddressKey].fun,
      });
    }

    this.setState({ 
      open: false,
      open2: true, 
      address: this.props.store.wallet.currentAddressSelected,
    });
  };

  handleClose = () => {
    this.props.store.wallet.hasEnoughGasCoverage = false;
    this.setState({ 
      open: false,
      open2: false,
      openError: false,
      amount: 0,
      tokenChoice: '',
      address: '',
      available: '',
    });
  };

  handleChange = name => event => {
    const regex = /^\d+(\.\d{1,8})?$/;     
    if (event.target.value === '' || regex.test(event.target.value)) {
      this.setState({
        [name]: event.target.value,
      });
    }
    if (this.state.available > 2 && this.state.available < event.target.value) {
      this.setState({
        [name]: this.state.available - 2,
      });
    }    
  };
  onWithdraw = () => {
    this.setState({
      open: false,
      open2: false,
    });
  }

  closeAll = () => {
    this.setState({
      open: false,
      open2: false,
    });
    this.props.store.wallet.closeTxDialog();
  }

  render() {
    const { store: { wallet } } = this.props;
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
        <button
          className="ui positive button"
          onClick={this.handleClickOpenDepositChoice}
        >
          <FastRewind className='verticalTextButton'></FastRewind>
          <AccountBalanceWallet className='verticalTextButton'></AccountBalanceWallet>
          <span className='verticalTextButton leftPadMidBut'>Deposit</span>  
        </button>    
        
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
            <input
              id="standard-number"
              label="Amount"
              value={this.state.amount}
              onChange={this.handleChange('amount')}
              type="number"
              min={0}
              max={this.state.available}
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

        <Dialog
          open={wallet.hasEnoughGasCoverage}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title2"
        >
          <DialogTitle id="form-dialog-title2">Warning</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You need to leave atleast 2 RUNES in your wallet to cover GAS fees.              
            </DialogContentText>       
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>        
        <FundExchangeTxConfirmDialog onWithdraw={this.onWithdraw} id={messages.txConfirmMsgSendMsg.id} />
        {wallet.txSentDialogOpen && (
          <TxSentDialog
            txid={wallet.txid}
            open={wallet.txSentDialogOpen}
            onClose={this.closeAll}
          />
        )}
      </div>
    );
  }
}