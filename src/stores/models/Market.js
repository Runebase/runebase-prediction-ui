/*
* Model for Markets
* 
* 
*/
export default class Market {
  market = ''
  tokenName = ''
  price = ''
  change = ''  
  volume = ''

  // for invalid option
  localizedInvalid = {};

  constructor(Market, app) {
    Object.assign(this, Market);
    this.app = app;
    this.market = Market.market;
    this.tokenName = Market.tokenName;
    this.price = Market.price;
    this.change = Market.change;    
    this.volume = Market.volume;    
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
