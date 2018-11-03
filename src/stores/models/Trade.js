import { observable, computed } from 'mobx';

import { satoshiToDecimal } from '../../helpers/utility';

/*
* Model for Trades
* 
* 
*/
export default class Trade {
  from = ''
  to = ''
  soldTokens = ''
  boughtTokens = ''  
  tokenName = ''
  orderType = '' 
  price = ''
  orderId = ''
  time = ''
  amount = ''
  blockNum = ''

  // for invalid option
  localizedInvalid = {};

  constructor(Trade, app) {
    Object.assign(this, Trade);
    this.app = app;
    this.from = Trade.from;
    this.to = Trade.to;
    this.soldTokens = Trade.soldTokens;
    this.boughtTokens = Trade.boughtTokens;    
    this.tokenName = Trade.tokenName;
    this.orderType = Trade.orderType;   
    this.price = Trade.price;
    this.orderId = Trade.orderId;
    this.time = Trade.time;
    this.amount = Trade.amount;
    this.blockNum = Trade.blockNum;
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
