import _ from 'lodash';

import AddressBalance from './AddressBalance';
import ExchangeBalance from './ExchangeBalance';
import { SortBy } from '../../constants';


export default class SyncInfo {
  percent = 0
  blockNum = 0
  blockTime = ''
  balances = []
  exchangeBalances = []
  peerNodeCount = 0

  constructor(syncInfo) {
    Object.assign(this, syncInfo);
    this.percent = syncInfo.syncPercent;
    this.blockNum = syncInfo.syncBlockNum;
    this.blockTime = Number(syncInfo.syncBlockTime);
    this.peerCount = Number(syncInfo.peerNodeCount);
    const balances = _.map(syncInfo.addressBalances, (addressBalance) => new AddressBalance(addressBalance));
    const exchangeBalances = _.map(syncInfo.exchangeBalances, (exchangeBalance) => new ExchangeBalance(exchangeBalance));
    // Sort by runebase balance
    this.balances = _.orderBy(balances, ['runebase'], [SortBy.DESCENDING.toLowerCase()]);
    this.exchangeBalances = _.orderBy(exchangeBalances, ['runes'], [SortBy.DESCENDING.toLowerCase()]);
  }
}
