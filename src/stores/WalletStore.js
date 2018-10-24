import { observable, action, runInAction, reaction, computed } from 'mobx';
import _ from 'lodash';
import moment from 'moment';
import { TransactionType, Token } from 'constants';
import { Transaction, TransactionCost } from 'models';
import { defineMessages } from 'react-intl';

import axios from '../network/api';
import Routes from '../network/routes';
import { createTransferTx } from '../network/graphql/mutations';
import { decimalToSatoshi } from '../helpers/utility';
import Tracking from '../helpers/mixpanelUtil';
import { getWalletData } from '../helpers/exchange';

// TODO: ADD ERROR TEXT FIELD FOR WITHDRAW DIALOGS, ALSO INTL TRANSLATION UPDATE
const messages = defineMessages({
  withdrawDialogInvalidAddressMsg: {
    id: 'withdrawDialog.invalidAddress',
    defaultMessage: 'Invalid address',
  },
  withdrawDialogAmountLargerThanZeroMsg: {
    id: 'withdrawDialog.amountLargerThanZero',
    defaultMessage: 'Amount should be larger than 0',
  },
  withdrawDialogAmountExceedLimitMsg: {
    id: 'withdrawDialog.amountExceedLimit',
    defaultMessage: 'Amount exceed the limit',
  },
  withdrawDialogRequiredMsg: {
    id: 'withdrawDialog.required',
    defaultMessage: 'Required',
  },
  depositDialogInvalidAddressMsg: {
    id: 'withdrawDialog.invalidAddress',
    defaultMessage: 'Invalid address',
  },
  depositDialogAmountLargerThanZeroMsg: {
    id: 'withdrawDialog.amountLargerThanZero',
    defaultMessage: 'Amount should be larger than 0',
  },
  depositDialogAmountExceedLimitMsg: {
    id: 'withdrawDialog.amountExceedLimit',
    defaultMessage: 'Amount exceed the limit',
  },
  depositDialogRequiredMsg: {
    id: 'withdrawDialog.required',
    defaultMessage: 'Required',
  },
});

const INIT_VALUE = {
  market: 'PRED',
  exchangeAddress: '5dNoKDt3fQFKMXeUR21SoappnLg9YEggMU',
  marketContract: '66cf6409b12e09d9d16395d2f0b224e56c3dc3a2',
  accountData: [],
  addressesHasCoin: [],
  addressList: [],
  addresses: [],
  currentAddressBalanceRunes: '',
  currentAddressBalanceToken: '',
  currentAddressBalanceKey: '',
  lastUsedAddress: '',
  walletEncrypted: false,
  encryptResult: undefined,
  passphrase: '',
  walletUnlockedUntil: 0,
  unlockDialogOpen: false,
  changePassphraseResult: undefined,
  txConfirmDialogOpen: false,
};

const INIT_VALUE_DIALOG = {
  selectedToken: Token.RUNES,
  toAddress: '',
  withdrawAmount: '',
  withdrawDialogError: {
    withdrawAmount: '',
    walletAddress: '',
  },
};

const INIT_VALUE_EXCHANGE_DIALOG = {
  selectedToken: Token.RUNES,
  toAddress: '',
  withdrawAmount: '',
  withdrawDialogError: {
    withdrawAmount: '',
    walletAddress: '',
  },
  depositAmount: '',
  depositDialogError: {
    depositAmount: '',
    walletAddress: '',
  },
};

export default class {
  @observable exchangeAddress = INIT_VALUE.exchangeAddress;
  @observable currentAddressBalanceRunes = INIT_VALUE.currentAddressBalanceRunes;
  @observable currentAddressBalanceToken = INIT_VALUE.currentAddressBalanceToken;
  @observable currentAddressBalanceKey = INIT_VALUE.currentAddressBalanceKey;  
  @observable market = INIT_VALUE.market;
  @observable marketContract = INIT_VALUE.marketContract;
  @observable addressesHasCoin = INIT_VALUE.addressesHasCoin;
  @observable addressList = INIT_VALUE.addressList;
  @observable tokenAmount = INIT_VALUE.tokenAmount;
  @observable addresses = INIT_VALUE.addresses;
  @observable lastUsedAddress = INIT_VALUE.lastUsedAddress;
  @observable walletEncrypted = INIT_VALUE.walletEncrypted;
  @observable encryptResult = INIT_VALUE.encryptResult;
  @observable passphrase = INIT_VALUE.passphrase;
  @observable walletUnlockedUntil = INIT_VALUE.walletUnlockedUntil;
  @observable unlockDialogOpen = INIT_VALUE.unlockDialogOpen;
  @observable selectedToken = INIT_VALUE_DIALOG.selectedToken;
  @observable changePassphraseResult = INIT_VALUE.changePassphraseResult;
  @observable txConfirmDialogOpen = INIT_VALUE.txConfirmDialogOpen;
  @observable withdrawDialogError = INIT_VALUE_DIALOG.withdrawDialogError;
  @observable withdrawAmount = INIT_VALUE_DIALOG.withdrawAmount;
  @observable toAddress = INIT_VALUE_DIALOG.toAddress;
  constructor(app) {
    this.app = app;

    // Set a default lastUsedAddress if there was none selected before
    reaction(
      () => this.addresses,
      () => {
        if (_.isEmpty(this.lastUsedAddress) && !_.isEmpty(this.addresses)) {
          this.lastUsedAddress = this.addresses[0].address;
        }
      }
    );
  }
  @action changeMarket = (market, addresses) => {
    if (market === this.market) {
      return;
    }
    this.currentAddressBalanceRunes = '';
    this.currentAddressBalanceToken = '';
    this.addressList = [];
    this.market = market;    
    market = market.toLowerCase();
    addresses.forEach((address) => {
      if (address[market] || address.runebase) {
        this.accountData = [address.address, market, address[market], address.runebase];
        this.addressList.push( this.accountData );
      }
    }); 
    switch(this.market) {
      case 'PRED':
        this.tokenAmount = _.sumBy(addresses, ({ pred }) => pred).toFixed(2) || '0.00';
        this.marketContract = '1';
        break;
      case 'FUN':
        this.tokenAmount = _.sumBy(addresses, ({ fun }) => fun).toFixed(2) || '0.00';
        this.marketContract = '2';
        break;
      case 'RRC322':
        this.tokenAmount = _.sumBy(addresses, ({ fun }) => fun).toFixed(2) || '0.00';
        this.marketContract = '3';
        break;
      default:
        this.marketContract = "foo";
        return 'foo';
    }    
  }
  @action changeAddress = (event) => {
    this.currentAddressBalanceKey = event.target.attributes.getNamedItem('address').value;
    console.log(this.currentAddressBalanceKey);
  }

  @action
  prepareDepositExchange = async (walletAddress, confirmAmount, tokenChoice) => {
    console.log(tokenChoice);
    this.walletAddress = walletAddress;
    this.toAddress = '';
    this.confirmAmount = confirmAmount;
    this.tokenChoice = tokenChoice;
    try {
      const { data: { result } } = await axios.post(Routes.api.transactionCost, {
        type: TransactionType.TRANSFER,
        token: tokenChoice,
        amount: tokenChoice === 'PRED' || tokenChoice === 'FUN' ? decimalToSatoshi(confirmAmount) : Number(confirmAmount),
        senderAddress: walletAddress,
      });
      const txFees = _.map(result, (item) => new TransactionCost(item));
      runInAction(() => {
        this.txFees = txFees;
        this.txConfirmDialogOpen = true;
      });
    } catch (error) {
      runInAction(() => {
        this.app.ui.setError(error.message, Routes.api.transactionCost);
      });
    }
  }

  @action
  confirmExchange = (onWithdraw) => {
    let amount = this.confirmAmount;
    if (this.tokenChoice === 'PRED') {
      amount = decimalToSatoshi(this.confirmAmount);
    }
    if (this.tokenChoice === 'FUN') {
      amount = decimalToSatoshi(this.confirmAmount);
    }
    console.log(this.walletAddress);
    console.log(this.exchangeAddress);
    console.log(this.tokenChoice);
    console.log(amount);
    this.createTransferTransaction(this.walletAddress, this.exchangeAddress, this.tokenChoice, amount);
    runInAction(() => {
      onWithdraw();
      this.txConfirmDialogOpen = false;
      Tracking.track('myWallet-withdraw');
    });
  };

  @action
  createTransferTransactionExchange = async (walletAddress, toAddress, selectedToken, amount) => {
    try {
      const { data: { transfer } } = await createTransferTx(walletAddress, toAddress, selectedToken, amount);
      this.app.myWallet.history.addTransaction(new Transaction(transfer));
      runInAction(() => {
        this.app.pendingTxsSnackbar.init();
      });
    } catch (error) {
      runInAction(() => {
        this.app.ui.setError(error.message, Routes.api.createTransferTx);
      });
    }
  }

  @computed get currentAddressSelected() {
    return this.currentAddressBalanceKey;
  }
  @computed get currentAddresses() {
    return this.addressList;
  }
  @computed get currentMarketContract() {
    return this.marketContract;
  }
  @computed get currentMarket() {
    return this.market;
  }
  @computed get currentTokenAmount() {
    return this.tokenAmount;
  }
  @computed get needsToBeUnlocked() {
    if (this.walletEncrypted) return false;
    if (this.walletUnlockedUntil === 0) return true;
    const now = moment();
    const unlocked = moment.unix(this.walletUnlockedUntil).subtract(1, 'hours');
    return now.isSameOrAfter(unlocked);
  }

  @computed get withdrawDialogHasError() {
    if (this.withdrawDialogError.withdrawAmount !== '') return true;
    if (this.withdrawDialogError.walletAddress !== '') return true;
    return false;
  }

  @computed get lastAddressWithdrawLimit() {
    return { RUNES: this.lastUsedWallet.runebase, PRED: this.lastUsedWallet.pred, FUN: this.lastUsedWallet.fun };
  }
  @computed get depsoitDialogHasError() {
    if (this.withdrawDialogError.withdrawAmount !== '') return true;
    if (this.withdrawDialogError.walletAddress !== '') return true;
    return false;
  }

  @computed get lastAddressDepositLimit() {
    return { RUNES: this.lastUsedWallet.runebase, PRED: this.lastUsedWallet.pred, FUN: this.lastUsedWallet.fun };
  }
  @computed get lastUsedWallet() {
    const res = _.filter(this.addresses, (x) => x.address === this.lastUsedAddress);
    if (res.length > 0) return res[0];
    return {};
  }

  @action
  checkWalletEncrypted = async () => {
    try {
      const { data: { result } } = await axios.get(Routes.api.getWalletInfo);

      runInAction(() => {
        this.walletEncrypted = result && !_.isUndefined(result.unlocked_until);
        this.walletUnlockedUntil = result && result.unlocked_until ? result.unlocked_until : 0;
      });
    } catch (error) {
      runInAction(() => {
        this.app.ui.setError(error.message, Routes.api.getWalletInfo);
      });
    }
  }

  @action
  encryptWallet = async (passphrase) => {
    try {
      const { data: { result } } = await axios.post(Routes.api.encryptWallet, {
        passphrase,
      });
      this.encryptResult = result;
    } catch (error) {
      runInAction(() => {
        this.app.ui.setError(error.message, Routes.api.encryptWallet);
      });
    }
  }

  @action
  onPassphraseChange = (passphrase) => {
    this.passphrase = passphrase;
  }

  @action
  clearEncryptResult = () => {
    this.encryptResult = undefined;
  }

  isValidAddress = async (addressToVerify) => {
    try {
      const { data: { result } } = await axios.post(Routes.api.validateAddress, { address: addressToVerify });
      return result.isvalid;
    } catch (error) {
      runInAction(() => {
        this.app.ui.setError(error.message, Routes.api.validateAddress);
      });
    }
  }

  @action
  validateWithdrawDialogWalletAddress = async () => {
    if (_.isEmpty(this.toAddress)) {
      this.withdrawDialogError.walletAddress = messages.withdrawDialogRequiredMsg.id;
    } else if (!(await this.isValidAddress(this.toAddress))) {
      this.withdrawDialogError.walletAddress = messages.withdrawDialogInvalidAddressMsg.id;
    } else {
      this.withdrawDialogError.walletAddress = '';
    }
  }

  @action
  validateWithdrawDialogAmount = () => {
    if (_.isEmpty(this.withdrawAmount)) {
      this.withdrawDialogError.withdrawAmount = messages.withdrawDialogRequiredMsg.id;
    } else if (Number(this.withdrawAmount) <= 0) {
      this.withdrawDialogError.withdrawAmount = messages.withdrawDialogAmountLargerThanZeroMsg.id;
    } else if (Number(this.withdrawAmount) > this.lastAddressWithdrawLimit[this.selectedToken]) {
      this.withdrawDialogError.withdrawAmount = messages.withdrawDialogAmountExceedLimitMsg.id;
    } else {
      this.withdrawDialogError.withdrawAmount = '';
    }
  }

  @action
  resetWithdrawDialog = () => Object.assign(this, INIT_VALUE_DIALOG);

  @action
  resetDepositDialog = () => Object.assign(this, INIT_VALUE_DIALOG);

  @action
  backupWallet = async () => {
    try {
      await axios.post(Routes.api.backupWallet);
    } catch (error) {
      runInAction(() => {
        this.app.ui.setError(error.message, Routes.api.backupWallet);
      });
    }
  }

  @action
  confirm = (onWithdraw) => {
    let amount = this.withdrawAmount;
    if (this.selectedToken === Token.PRED) {
      amount = decimalToSatoshi(this.withdrawAmount);
    }
    if (this.selectedToken === Token.FUN) {
      amount = decimalToSatoshi(this.withdrawAmount);
    }
    this.createTransferTransaction(this.walletAddress, this.toAddress, this.selectedToken, amount);
    runInAction(() => {
      onWithdraw();
      this.txConfirmDialogOpen = false;
      Tracking.track('myWallet-withdraw');
    });
  };


  @action
  prepareWithdraw = async (walletAddress) => {
    this.walletAddress = walletAddress;
    try {
      const { data: { result } } = await axios.post(Routes.api.transactionCost, {
        type: TransactionType.TRANSFER,
        token: this.selectedToken,
        amount: this.selectedToken === Token.PRED || this.selectedToken === Token.FUN ? decimalToSatoshi(this.withdrawAmount) : Number(this.withdrawAmount),
        optionIdx: undefined,
        topicAddress: undefined,
        oracleAddress: undefined,
        senderAddress: walletAddress,
      });
      const txFees = _.map(result, (item) => new TransactionCost(item));
      runInAction(() => {
        this.txFees = txFees;
        this.txConfirmDialogOpen = true;
      });
    } catch (error) {
      runInAction(() => {
        this.app.ui.setError(error.message, Routes.api.transactionCost);
      });
    }
  }

  @action
  prepareDeposit = async (walletAddress) => {
    this.walletAddress = walletAddress;
    try {
      const { data: { result } } = await axios.post(Routes.api.transactionCost, {
        type: TransactionType.TRANSFER,
        token: this.selectedToken,
        amount: this.selectedToken === Token.PRED || Token.FUN ? decimalToSatoshi(this.depositAmount) : Number(this.depositAmount),
        optionIdx: undefined,
        topicAddress: undefined,
        oracleAddress: undefined,
        senderAddress: walletAddress,
      });
      const txFees = _.map(result, (item) => new TransactionCost(item));
      runInAction(() => {
        this.txFees = txFees;
        this.txConfirmDialogOpen = true;
      });
    } catch (error) {
      runInAction(() => {
        this.app.ui.setError(error.message, Routes.api.transactionCost);
      });
    }
  }
  @action
  createTransferTransaction = async (walletAddress, toAddress, selectedToken, amount) => {
    try {
      const { data: { transfer } } = await createTransferTx(walletAddress, toAddress, selectedToken, amount);
      this.app.myWallet.history.addTransaction(new Transaction(transfer));
      runInAction(() => {
        this.app.pendingTxsSnackbar.init();
      });
    } catch (error) {
      runInAction(() => {
        this.app.ui.setError(error.message, Routes.api.createTransferTx);
      });
    }
  }

  @action
  changePassphrase = async (oldPassphrase, newPassphrase) => {
    try {
      const changePassphraseResult = await axios.post(Routes.api.walletPassphraseChange, {
        oldPassphrase,
        newPassphrase,
      });
      runInAction(() => {
        this.changePassphraseResult = changePassphraseResult;
      });
    } catch (error) {
      runInAction(() => {
        this.app.ui.setError(error.message, Routes.api.walletPassphraseChange);
      });
    }
  }
}
