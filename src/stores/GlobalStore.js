import { observable, action, reaction } from 'mobx';
import { OracleStatus, Token } from 'constants';
import _ from 'lodash';

import SyncInfo from './models/SyncInfo';
import Market from './models/Market';
import { querySyncInfo, queryAllTopics, queryAllOracles, queryAllVotes, queryAllNewOrders, queryAllMarkets } from '../network/graphql/queries';
import getSubscription, { channels } from '../network/graphql/subscriptions';
import apolloClient from '../network/graphql';
import AppConfig from '../config/app';


const INIT_VALUES = {
  marketInfo: '',
  selectedOrderInfo: '',
  selectedOrderId: 0,
  syncPercent: 0,
  syncBlockNum: 0,
  syncBlockTime: '',
  peerNodeCount: 1,
  userData: {
    resultSettingCount: 0,
    finalizeCount: 0,
    withdrawCount: 0,
    totalCount: 0,
  },
};
let syncInfoInterval;
let syncSelectedOrderInterval;
let syncMarketInterval;

export default class GlobalStore {
  @observable selectedOrderId = INIT_VALUES.selectedOrderId
  @observable selectedOrderInfo = INIT_VALUES.selectedOrderInfo
  @observable marketInfo = INIT_VALUES.marketInfo
  @observable syncPercent = INIT_VALUES.syncPercent
  @observable syncBlockNum = INIT_VALUES.syncBlockNum
  @observable syncBlockTime = INIT_VALUES.syncBlockTime
  @observable peerNodeCount = INIT_VALUES.peerNodeCount
  userData = observable({
    resultSettingCount: INIT_VALUES.userData.resultSettingCount,
    finalizeCount: INIT_VALUES.userData.finalizeCount,
    withdrawCount: INIT_VALUES.userData.withdrawCount,
    get totalCount() {
      return this.resultSettingCount + this.finalizeCount + this.withdrawCount;
    },
  });

  constructor(app) {
    this.app = app;
    // Disable the syncInfo polling since we will get new syncInfo from the subscription
    reaction(
      () => this.syncPercent,
      () => {
        if (this.syncPercent >= 100) {
          clearInterval(syncInfoInterval);
        }
      },
    );
    // Update the actionable item count when the addresses or block number changes
    reaction(
      () => this.app.wallet.addresses + this.app.global.syncBlockNum,
      () => {
        if (this.syncPercent >= 100) {
          this.getActionableItemCount();
        }
      },
    );

    // Call syncInfo once to init the wallet addresses used by other stores
    this.getSyncInfo();
    this.subscribeSyncInfo();

    // Call MarketsInfo once to init the wallet addresses used by other stores
    this.getMarketInfo();
    this.subscribeMarketInfo();


    // Call SellOrders once to init the wallet addresses used by other stores
    this.getSelectedOrderInfo();
    this.subscribeSelectedOrderInfo();

    // Start syncInfo long polling
    // We use this to update the percentage of the loading screen
    syncInfoInterval = setInterval(this.getSyncInfo, AppConfig.intervals.syncInfo);
    syncSelectedOrderInterval = setInterval(this.getSelectedOrderInfo, AppConfig.intervals.selectedOrderInfo);
    syncMarketInterval = setInterval(this.getMarketInfo, AppConfig.intervals.marketInfo);
  }

  /*
  *
  *
  */
  @action
  setSelectedOrderId = (orderId) => {
    this.selectedOrderId = orderId;
  }

  /*
  *
  *
  */
  @action
  onSelectedOrderInfo = (selectedOrderInfo) => {
    if (selectedOrderInfo.error) {
      console.error(selectedOrderInfo.error.message); // eslint-disable-line no-console
    } else {
      this.selectedOrderInfo = selectedOrderInfo[0]; // eslint-disable-line
    }
  }

  /*
  *
  *
  */
  @action
  getSelectedOrderInfo = async () => {
    try {
      const orderBy = { field: 'price', direction: 'ASC' };
      const filters = [{ orderId: this.selectedOrderId }];
      const selectedOrderInfo = await queryAllNewOrders(filters, orderBy, 0, 0);
      this.onSelectedOrderInfo(selectedOrderInfo);
    } catch (error) {
      this.onSelectedOrderInfo({ error });
    }
  }

  /*
  *
  *
  */
  subscribeSelectedOrderInfo = () => {
    const self = this;
    apolloClient.subscribe({
      query: getSubscription(channels.ON_SELECTEDORDER_INFO),
    }).subscribe({
      next({ data, errors }) {
        if (errors && errors.length > 0) {
          self.onSelectedOrderInfo({ error: errors[0] });
        } else {
          self.onSelectedOrderInfo(data.onSelectedOrderInfo);
        }
      },
      error(err) {
        self.onSelectedOrderInfo({ error: err.message });
      },
    });
  }

  /*
  *
  *
  */
  @action
  onMarketInfo = (marketInfo) => {
    if (marketInfo.error) {
      console.error(marketInfo.error.message); // eslint-disable-line no-console
    } else {
      const result = _.uniqBy(marketInfo, 'market').map((market) => new Market(market, this.app));
      const resultOrder = _.orderBy(result, ['market'], 'desc');
      console.log(resultOrder);
      this.marketInfo = resultOrder;
    }
  }

  /*
  *
  *
  */
  @action
  getMarketInfo = async () => {
    try {
      const orderBy = { field: 'market', direction: 'DESC' };
      const filters = [];
      console.log('getmarketinfo');
      const marketInfo = await queryAllMarkets(filters, orderBy, 0, 0);
      console.log(marketInfo);
      this.onMarketInfo(marketInfo);
    } catch (error) {
      this.onMarketInfo({ error });
    }
  }

  /*
  *
  *
  */
  subscribeMarketInfo = () => {
    const self = this;
    apolloClient.subscribe({
      query: getSubscription(channels.ON_MARKET_INFO),
    }).subscribe({
      next({ data, errors }) {
        if (errors && errors.length > 0) {
          self.onMarketInfo({ error: errors[0] });
        } else {
          self.onMarketInfo(data.onMarketInfo);
        }
      },
      error(err) {
        self.onMarketInfo({ error: err.message });
      },
    });
  }

  /*
  *
  *
  */
  @action
  onSyncInfo = (syncInfo) => {
    if (syncInfo.error) {
      console.error(syncInfo.error.message); // eslint-disable-line no-console
    } else {
      const { percent, blockNum, blockTime, balances, exchangeBalances, peerNodeCount } = new SyncInfo(syncInfo);
      this.syncPercent = percent;
      this.syncBlockNum = blockNum;
      this.syncBlockTime = blockTime;
      this.peerNodeCount = peerNodeCount || 0;
      this.app.wallet.addresses = balances;
      this.app.wallet.exchangeAddresses = exchangeBalances;
    }
  }

  /**
   * Queries syncInfo by GraphQL call.
   * This is long-polled in the beginning while the server is syncing the blockchain.
   */
  @action
  getSyncInfo = async () => {
    try {
      const includeBalances = this.syncPercent === 0 || this.syncPercent >= 98;
      const syncInfo = await querySyncInfo(includeBalances);
      this.onSyncInfo(syncInfo);
    } catch (error) {
      this.onSyncInfo({ error });
    }
  }

  /**
   * Subscribe to syncInfo subscription.
   * This is meant to be used after the long-polling getSyncInfo is finished.
   * This subscription will return a syncInfo on every new block.
   */
  subscribeSyncInfo = () => {
    const self = this;
    apolloClient.subscribe({
      query: getSubscription(channels.ON_SYNC_INFO),
    }).subscribe({
      next({ data, errors }) {
        if (errors && errors.length > 0) {
          self.onSyncInfo({ error: errors[0] });
        } else {
          self.onSyncInfo(data.onSyncInfo);
        }
      },
      error(err) {
        self.onSyncInfo({ error: err.message });
      },
    });
  }

  /**
   * Gets the actionable item count for all the addresses the user owns.
   * Actionable item count means the number of items the user can take action on.
   * eg. This user can do 4 set results, 10 finalizes, and 5 withdraws
   */
  @action
  getActionableItemCount = async () => {
    try {
      const voteFilters = [];
      const topicFilters = [];

      // Get all votes for all your addresses
      _.each(this.app.wallet.addresses, (item) => {
        voteFilters.push({ voterQAddress: item.address });
        topicFilters.push({ status: OracleStatus.WITHDRAW, creatorAddress: item.address });
      });

      // Filter votes
      let votes = await queryAllVotes(voteFilters);
      votes = votes.reduce((accumulator, vote) => {
        const { voterQAddress, topicAddress, optionIdx } = vote;
        if (!_.find(accumulator, { voterQAddress, topicAddress, optionIdx })) accumulator.push(vote);
        return accumulator;
      }, []);

      _.each(votes, ({ topicAddress, optionIdx }) => {
        topicFilters.push({ status: OracleStatus.WITHDRAW, address: topicAddress, resultIdx: optionIdx });
      });
      const topicsForVotes = await queryAllTopics(topicFilters);
      this.userData.withdrawCount = topicsForVotes.length;

      // Get result set items
      const oracleSetFilters = [{ token: Token.RUNES, status: OracleStatus.OPEN_RESULT_SET }];
      _.each(action.walletAddresses, (item) => {
        oracleSetFilters.push({
          token: Token.RUNES,
          status: OracleStatus.WAIT_RESULT,
          resultSetterQAddress: item.address,
        });
      });
      const oraclesForResultset = await queryAllOracles(oracleSetFilters);
      this.userData.resultSettingCount = oraclesForResultset.length;

      // Get finalize items
      const oracleFinalizeFilters = [{ token: Token.PRED, status: OracleStatus.WAIT_RESULT }];
      const oraclesForFinalize = await queryAllOracles(oracleFinalizeFilters);
      this.userData.finalizeCount = oraclesForFinalize.length;
    } catch (err) {
      console.error(err); // eslint-disable-line
    }
  }
}
