import { satoshiToDecimal } from '../../helpers/utility';

export default class AddressBalance {
  address = ''
  runebase = ''
  runes = ''
  pred = ''
  fun = ''

  constructor(addressBalance) {
    Object.assign(this, addressBalance);
    this.address = this.address;
    this.runebase = satoshiToDecimal(addressBalance.runebase);
    this.runes = satoshiToDecimal(addressBalance.runes);
    this.pred = satoshiToDecimal(addressBalance.pred);
    this.fun = satoshiToDecimal(addressBalance.fun);
  }
}
