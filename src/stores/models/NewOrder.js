import { observable, computed } from 'mobx';

import { satoshiToDecimal } from '../../helpers/utility';

/*
* Model for NewOrders
* 
* 
*/
export default class NewOrder {
  txid = ''
  orderId = ''
  owner = ''
  sellToken = ''
  buyToken = ''
  priceMul = ''
  priceDiv = ''
  time = ''
  amount = ''
  blockNum = ''

  // for invalid option
  localizedInvalid = {};

  constructor(newOrder, app) {
    Object.assign(this, newOrder);
    this.app = app;
    this.amount = newOrder.amount;
    this.txid = newOrder.txid;
    this.sellToken = newOrder.sellToken;
    this.buyToken = newOrder.buyToken;
    this.priceMul = newOrder.priceMul;
    this.priceDiv = newOrder.priceDiv;
    this.owner = newOrder.owner;
    this.time = newOrder.time;
    this.amount = newOrder.amount;
    this.blockNum = newOrder.blockNum;
    this.localizedInvalid = {
      en: 'Invalid',
      zh: '无效',
      ko: '무효의',
      parse(locale) {
        return this[locale.slice(0, 2)];
      },
    };
  }
}
