import { satoshiToDecimal } from '../../helpers/utility';

export default class ExchangeBalance {
  address = ''
  runebase = ''
  runes = ''
  pred = ''
  fun = ''

  constructor(exchangeBalance) {
    Object.assign(this, exchangeBalance);
    this.address = this.address;
    this.runebase = satoshiToDecimal(exchangeBalance.runebase);
    this.runes = satoshiToDecimal(exchangeBalance.runes);
    this.pred = satoshiToDecimal(exchangeBalance.pred);
    this.fun = satoshiToDecimal(exchangeBalance.fun);
  }
}
