import { observable, action, runInAction, reaction, computed } from 'mobx';
import _ from 'lodash';
import { inject } from 'mobx-react';

const INIT_VALUE = {
  addresses: [],
  lastUsedAddress: '',
};

export default class ExchangeStore {
  @observable market = "PRED";
  @observable addresses = INIT_VALUE.addresses;
  @observable lastUsedAddress = INIT_VALUE.lastUsedAddress;

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

  @action changeMarket = (market) => {
  	console.log(market);
    this.market = market;
  }

  @computed get currentMarket() {
    return this.market;
  }
}
