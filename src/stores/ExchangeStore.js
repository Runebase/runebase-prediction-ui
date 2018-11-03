import { observable, action, runInAction, reaction } from 'mobx';
import _ from 'lodash';
import { Token, OracleStatus, Routes } from '../constants';
import { queryAllNewOrders } from '../network/graphql/queries';
import NewOrder from './models/NewOrder';

const INIT_VALUES = {
  loaded: false, // loading state?
  list: [], // data list
  hasMore: true, // has more data to fetch?
  skip: 0, // skip
  limit: 500, // loading batch amount
  length: 0,
};

export default class ExchangeStore {
  @observable loaded = INIT_VALUES.loaded
  @observable list = INIT_VALUES.list
  @observable hasMore = INIT_VALUES.hasMore
  @observable skip = INIT_VALUES.skip
  @observable length = INIT_VALUES.length
  limit = INIT_VALUES.limit

  constructor(app) {
    this.app = app;
    reaction(
      () => this.app.sortBy + this.app.wallet.addresses + this.app.global.syncBlockNum + this.app.refreshing,
      () => {
        if (this.app.ui.location === Routes.EXCHANGE) {
          this.init();
        }
      }
    );
    reaction(
      () => this.list,
      () => {
        if (this.loaded && this.list.length < this.skip) this.hasMore = false;
      }
    );
  }

  @action
  init = async (limit = this.limit) => {
    Object.assign(this, INIT_VALUES);
    this.app.ui.location = Routes.EXCHANGE;
    this.list = await this.fetch(limit);    
    runInAction(() => {
      this.loaded = false;
    });
  }

  async fetch(limit = this.limit, skip = this.skip) {
  	console.log(this.app.wallet.currentAddressBalanceKey );
    if (this.hasMore) {
      const orderBy = { field: 'orderId', direction: this.app.sortBy };
      const filters = [{ owner: this.app.wallet.currentAddressBalanceKey }];
      let result = [];
      result = await queryAllNewOrders(filters, orderBy, limit, skip);
      result = _.uniqBy(result, 'txid').map((newOrder) => new NewOrder(newOrder, this.app));
      if (result.length < limit) this.hasMore = false;     
      return _.orderBy(result, ['orderId'], this.app.sortBy.toLowerCase());
    }
    return INIT_VALUES.list;
  }

}
